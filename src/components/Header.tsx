import React from 'react';
import logoImage from '../assets/images/7.png';

interface HeaderProps {
  onStartSurvey: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartSurvey }) => {
  return (
    <header className="bg-white/90 backdrop-blur shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logoImage} alt="RestMeter ロゴ" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">休養スコア診断</h1>
            <p className="text-xs text-slate-500">7つの質問で休養学に基づくセルフチェック</p>
          </div>
        </div>

        <button
          onClick={onStartSurvey}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl shadow hover:shadow-md transition-transform duration-200 hover:scale-105"
        >
          1分で診断を始める
        </button>
      </div>
    </header>
  );
};
