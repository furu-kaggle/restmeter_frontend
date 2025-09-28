import React, { useState } from 'react';
import { RotateCcw, Share2, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { SurveyData, ScoreData } from '../types';
import { calculateScores } from '../utils/scoring';
import { ScoreDisplay } from './ScoreDisplay';
import { KpiChart } from './KpiChart';
import { ShareModal } from './ShareModal';
import { ImprovementHints } from './ImprovementHints';

interface ResultsProps {
  data: SurveyData;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ data, onRestart }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const scores = calculateScores(data);

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <TrendingUp className="w-5 h-5 text-blue-500" />;
    return <AlertTriangle className="w-5 h-5 text-orange-500" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl shadow-sm p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">診断結果</h2>
          <p className="text-gray-600">過去1週間の休養状況を分析しました</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Share2 className="w-4 h-4 mr-2" />
            シェア
          </button>
          <button
            onClick={onRestart}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            再診断
          </button>
        </div>
      </div>

      {/* Main Score Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreDisplay
          title="総合休養スコア"
          score={scores.restScore}
          maxScore={100}
          icon={getScoreIcon(scores.restScore)}
          color={getScoreColor(scores.restScore)}
          label={`${scores.ratingStars} ${scores.ratingLabel}`}
          description={scores.ratingDescription}
          subtitle={`疲労度: ${scores.fatigueScore}/100`}
        />
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">KPI別スコア</h3>
          <KpiChart
            kpi1={scores.kpi1}
            kpi2={scores.kpi2}
            kpi3={scores.kpi3}
          />
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${scores.bottleneckKpi === '生理的資本' ? 'border-red-400 bg-red-50' : 'border-red-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">生理的資本</h4>
            <span className={`text-2xl font-bold ${getScoreColor(scores.kpi1)}`}>
              {scores.kpi1}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">身体の回復状況</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${scores.kpi1}%` }}
            />
          </div>
        </div>

        <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${scores.bottleneckKpi === '心理的資本' ? 'border-blue-400 bg-blue-50' : 'border-blue-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">心理的資本</h4>
            <span className={`text-2xl font-bold ${getScoreColor(scores.kpi2)}`}>
              {scores.kpi2}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">心の回復状況</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${scores.kpi2}%` }}
            />
          </div>
        </div>

        <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${scores.bottleneckKpi === '社会・能動的資本' ? 'border-green-400 bg-green-50' : 'border-green-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">社会・能動的資本</h4>
            <span className={`text-2xl font-bold ${getScoreColor(scores.kpi3)}`}>
              {scores.kpi3}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">環境調整・成長</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${scores.kpi3}%` }}
            />
          </div>
        </div>
      </div>

      {/* Improvement Hints */}
      <ImprovementHints 
        bottleneckKpi={scores.bottleneckKpi}
        bottleneckScore={scores.bottleneckScore}
        scores={scores}
      />

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          scores={scores}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};
