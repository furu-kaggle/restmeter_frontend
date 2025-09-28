import React, { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { SurveyData, Question } from '../types';
import { questions } from '../data/questions';

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

export const Survey: React.FC<SurveyProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<SurveyData>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value
    };
    setAnswers(newAnswers);
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(newAnswers as SurveyData);
      }
      setIsAnimating(false);
    }, 300);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            質問 {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progress)}% 完了
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-blue-50 text-blue-700">
            {question.category}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-relaxed">
            {question.text}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {question.description}
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
      {currentQuestion > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            回答済み
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {questions.slice(0, currentQuestion).map((q, index) => (
              <div key={q.id} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                Q{index + 1}: {answers[q.id]}/5
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};