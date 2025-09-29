export interface SurveyData {
  q1: number; // 朝すっきり
  q2: number; // 睡眠充足
  q3: number; // リズム安定
  q4: number; // デタッチメント
  q5: number; // 感情安定
  q6: number; // つながり
  q7: number; // 攻めの休養
}

export interface ScoreData {
  restScore: number;
  fatigueScore: number;
  kpi1: number; // 生理的資本
  kpi2: number; // 心理的資本
  kpi3: number; // 社会・能動的資本
  bottleneckKpi: string;
  bottleneckScore: number;
  ratingLevel: number;
  ratingLabel: string;
  ratingStars: string;
  ratingDescription: string;
  summary: string;
  nextAction: string;
}

export interface Question {
  id: keyof SurveyData;
  kpi: string;
  category: string;
  text: string;
  description: string;
}
