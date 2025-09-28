import React from 'react';
import { Lightbulb, Target, TrendingUp } from 'lucide-react';
import { ScoreData } from '../types';

interface ImprovementHintsProps {
  bottleneckKpi: string;
  bottleneckScore: number;
  scores: ScoreData;
}

export const ImprovementHints: React.FC<ImprovementHintsProps> = ({
  bottleneckKpi,
  bottleneckScore,
  scores
}) => {
  const getImprovementHints = (kpi: string, score: number) => {
    const hints = {
      '生理的資本': [
        '毎日同じ時間に就寝・起床する習慣をつけましょう',
        '寝室環境を整える（温度、湿度、遮光）',
        'カフェインやアルコールの摂取時間を見直しましょう',
        '就寝前のスマートフォン使用を控えましょう'
      ],
      '心理的資本': [
        '仕事終わりに「切り替えの儀式」を作りましょう',
        'マインドフルネスや瞑想を取り入れてみましょう',
        '感情を書き出すジャーナリングを試してみましょう',
        '趣味や好きなことに時間を作りましょう'
      ],
      '社会・能動的資本': [
        '家族や友人との会話時間を増やしましょう',
        '週2回以上の軽い運動習慣をつけましょう',
        'ストレッチやヨガなどのリラックス運動を取り入れましょう',
        '自然の中で過ごす時間を作りましょう'
      ]
    };

    return hints[kpi as keyof typeof hints] || [];
  };

  const hints = getImprovementHints(bottleneckKpi, bottleneckScore);
  const severity = bottleneckScore < 40 ? 'high' : bottleneckScore < 60 ? 'medium' : 'low';
  
  const severityConfig = {
    high: {
      title: '要注意！早めの対策を',
      color: 'border-red-400 bg-red-50',
      icon: Target,
      iconColor: 'text-red-600'
    },
    medium: {
      title: '改善の余地があります',
      color: 'border-orange-400 bg-orange-50',
      icon: TrendingUp,
      iconColor: 'text-orange-600'
    },
    low: {
      title: 'さらなる向上のために',
      color: 'border-blue-400 bg-blue-50',
      icon: Lightbulb,
      iconColor: 'text-blue-600'
    }
  };

  const config = severityConfig[severity];
  const IconComponent = config.icon;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border-l-4 ${config.color} p-6`}>
      <div className="flex items-center mb-4">
        <IconComponent className={`w-6 h-6 ${config.iconColor} mr-3`} />
        <div>
          <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
          <p className="text-sm text-gray-600">
            ボトルネック：{bottleneckKpi}（{bottleneckScore}/100）
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hints.map((hint, index) => (
          <div key={index} className="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-xs font-bold text-blue-600">{index + 1}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{hint}</p>
          </div>
        ))}
      </div>

      {scores.restScore >= 80 && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 font-medium">
            🎉 素晴らしい休養状況です！この調子で継続していきましょう。
          </p>
        </div>
      )}
    </div>
  );
};