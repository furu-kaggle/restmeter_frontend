import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { SurveyData } from '../types';

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

interface SurveyFlowQuestion {
  index: number;
  ordinal: number;
  total: number;
  data: {
    id: keyof SurveyData;
    category: string;
    text: string;
    description: string;
  };
}

interface SurveyFlowResponse {
  completed: boolean;
  answers: Partial<SurveyData>;
  question?: SurveyFlowQuestion;
  progress?: {
    answered: number;
    total: number;
    percent: number;
  };
  history?: Array<{
    index: number;
    id: keyof SurveyData;
    text: string;
    value: number;
  }>;
}

const FUNCTION_PATH = '/.netlify/functions/survey-flow';

export const Survey: React.FC<SurveyProps> = ({ onComplete }) => {
  const [question, setQuestion] = useState<SurveyFlowQuestion | null>(null);
  const [answers, setAnswers] = useState<Partial<SurveyData>>({});
  const [progress, setProgress] = useState<{ answered: number; total: number; percent: number }>({ answered: 0, total: 7, percent: 0 });
  const [history, setHistory] = useState<SurveyFlowResponse['history']>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestNext = useCallback(async (nextAnswers: Partial<SurveyData>) => {
    setError(null);
    try {
      const response = await fetch(FUNCTION_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: nextAnswers })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch next question (status: ${response.status})`);
      }

      const data: SurveyFlowResponse = await response.json();

      if (data.completed) {
        onComplete(data.answers as SurveyData);
        return;
      }

      if (!data.question || !data.progress) {
        throw new Error('Malformed survey response');
      }

      setQuestion(data.question);
      setAnswers(data.answers || {});
      setProgress(data.progress);
      setHistory(data.history || []);
    } catch (err) {
      console.error(err);
      setError('診断ロジックの取得に失敗しました。ネットワーク環境をご確認のうえ、再度お試しください。');
    } finally {
      setIsLoading(false);
      setIsAnimating(false);
    }
  }, [onComplete]);

  useEffect(() => {
    requestNext({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = async (value: number) => {
    if (!question) return;

    const newAnswers: Partial<SurveyData> = {
      ...answers,
      [question.data.id]: value
    };

    setIsAnimating(true);
    await requestNext(newAnswers);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm">診断を準備しています…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
        <AlertCircle className="w-8 h-8" />
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => {
            setIsLoading(true);
            setQuestion(null);
            requestNext({});
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          再読み込み
        </button>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  const progressPercent = Math.max(progress.percent, Math.round(((question.ordinal - 1) / progress.total) * 100));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            質問 {question.ordinal} / {question.total}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {progressPercent}% 完了
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-blue-50 text-blue-700">
            {question.data.category}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-relaxed">
            {question.data.text}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {question.data.description}
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className="group relative bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <div className="text-2xl font-bold text-gray-700 group-hover:text-blue-600 mb-1">
                {value}
              </div>
              <div className="text-xs text-gray-500 group-hover:text-blue-500">
                {value === 1 && 'まったく\n当てはまらない'}
                {value === 2 && 'あまり\n当てはまらない'}
                {value === 3 && 'どちらとも\n言えない'}
                {value === 4 && 'やや\n当てはまる'}
                {value === 5 && 'とても\n当てはまる'}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Hint */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <ChevronRight className="w-4 h-4 inline mr-1" />
          回答を選択すると自動的に次の質問に進みます
        </div>
      </div>

      {/* Completed Questions Summary */}
      {(history?.length ?? 0) > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            回答済み
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {history?.map((item) => (
              <div key={item.id} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                Q{item.index + 1}: {item.value}/5
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
