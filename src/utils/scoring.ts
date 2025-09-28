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
  
  // コンディションを定性評価（5段階）
  const getRating = (score: number) => {
    if (score >= 85) {
      return {
        level: 5,
        stars: '★★★★★',
        label: 'とても良い',
        description: 'しっかり休めている状態',
      } as const;
    }
    if (score >= 70) {
      return {
        level: 4,
        stars: '★★★★☆',
        label: '良好',
        description: 'パフォーマンスを維持できる状態',
      } as const;
    }
    if (score >= 55) {
      return {
        level: 3,
        stars: '★★★☆☆',
        label: '回復途上',
        description: '休養リズムの調整でさらに整えたい',
      } as const;
    }
    if (score >= 40) {
      return {
        level: 2,
        stars: '★★☆☆☆',
        label: '注意が必要',
        description: '疲労サインに早めに向き合うタイミング',
      } as const;
    }

    return {
      level: 1,
      stars: '★☆☆☆☆',
      label: '高疲労リスク',
      description: 'まずは休養戦略を見直そう',
    } as const;
  };

  const rating = getRating(restScore);
  
  return {
    restScore,
    fatigueScore,
    kpi1,
    kpi2,
    kpi3,
    bottleneckKpi: bottleneck.name,
    bottleneckScore: bottleneck.score,
    ratingLevel: rating.level,
    ratingLabel: rating.label,
    ratingStars: rating.stars,
    ratingDescription: rating.description,
  };
};
