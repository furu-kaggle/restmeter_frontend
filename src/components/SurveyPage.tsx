import React from 'react';
import { Survey } from './Survey';
import { SurveyData } from '../types';

interface SurveyPageProps {
  onComplete: (data: SurveyData) => void;
}

export const SurveyPage: React.FC<SurveyPageProps> = ({ onComplete }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">7つの質問で、休養の現在地をチェック</h2>
        <p className="text-gray-600">
          直近1週間のコンディションを思い出しながら、直感でお答えください。診断後は結果カードが自動生成されます。
        </p>
      </div>
      <Survey onComplete={onComplete} />
    </div>
  );
};
