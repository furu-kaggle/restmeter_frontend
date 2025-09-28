import { SurveyData, ScoreData } from '../types';

export const calculateScores = (data: SurveyData): ScoreData => {
  // 総合素点計算 (7-35の範囲)
  const rawTotal = data.q1 + data.q2 + data.q3 + data.q4 + data.q5 + data.q6 + data.q7;
  
  // 総合休養スコア (0-100)
  const restScore = Math.round((rawTotal - 7) / 28 * 100);
  
  // 疲労度 (0-100)
  const fatigueScore = 100 - restScore;
  
  // KPI別スコア計算 (0-100)
  const kpi1 = Math.round(((data.q1 + data.q2 + data.q3) - 3) / 12 * 100);
  const kpi2 = Math.round(((data.q4 + data.q5) - 2) / 8 * 100);
  const kpi3 = Math.round(((data.q6 + data.q7) - 2) / 8 * 100);
  
  // ボトルネックKPI特定
  const kpiScores = [
    { name: '生理的資本', score: kpi1 },
    { name: '心理的資本', score: kpi2 },
    { name: '社会・能動的資本', score: kpi3 }
  ];
  
  const bottleneck = kpiScores.reduce((min, current) => 
    current.score < min.score ? current : min
  );
  
  // 判定ラベル
  const getLabel = (score: number): string => {
    if (score >= 80) return 'とても良い（しっかり休めている）';
    if (score >= 60) return 'まずまず（小さな改善余地）';
    if (score >= 40) return '要注意（休養戦略のテコ入れ推奨）';
    return '高疲労リスク（早めの調整を）';
  };
  
  return {
    restScore,
    fatigueScore,
    kpi1,
    kpi2,
    kpi3,
    bottleneckKpi: bottleneck.name,
    bottleneckScore: bottleneck.score,
    label: getLabel(restScore)
  };
};