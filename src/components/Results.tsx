import React, { useState } from 'react';
import { RotateCcw, Share2, Home, Heart, Brain, Users, Loader2 } from 'lucide-react';
import { SurveyData } from '../types';
import { ShareModal } from './ShareModal';
import { ImprovementHints } from './ImprovementHints';

interface ResultsProps {
  data: SurveyData;
  onRestart: () => void;
  onBackHome: () => void;
}

const calculateScores = async (payload: SurveyData) => {
  const response = await fetch('/.netlify/functions/calculate-scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to calculate scores');
  }

  return response.json();
};

export const Results: React.FC<ResultsProps> = ({ data, onRestart, onBackHome }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [scores, setScores] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchScores = async () => {
      try {
        const calculated = await calculateScores(data);
        if (isMounted) {
          setScores(calculated);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('結果の計算に失敗しました。しばらくしてから再度お試しください。');
        }
      }
    };

    fetchScores();

    return () => {
      isMounted = false;
    };
  }, [data]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-3xl p-8 text-center">
        <p className="font-semibold mb-4">{error}</p>
        <p className="text-sm mb-6">大変お手数ですが、診断を最初からやり直してください。</p>
        <button
          onClick={onRestart}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          もう一度診断する
        </button>
      </div>
    );
  }

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm">診断結果を計算中です…</p>
      </div>
    );
  }

  const kpiDetails = [
    {
      name: '生理的資本',
      score: scores.kpi1,
      description: '身体の回復状況',
      barColor: 'bg-red-400',
      icon: Heart,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      accentFrom: 'from-red-50',
      accentTo: 'to-red-100'
    },
    {
      name: '心理的資本',
      score: scores.kpi2,
      description: '心の回復状況',
      barColor: 'bg-blue-400',
      icon: Brain,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      accentFrom: 'from-blue-50',
      accentTo: 'to-blue-100'
    },
    {
      name: '社会・能動的資本',
      score: scores.kpi3,
      description: '環境調整・成長',
      barColor: 'bg-green-400',
      icon: Users,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      accentFrom: 'from-green-50',
      accentTo: 'to-green-100'
    }
  ];

  const shareSummary = `休養スコア ${scores.restScore}/100（${scores.ratingLabel}）。弱いのは${scores.bottleneckKpi}。`;
  const nextAction = '寝る90分前は画面オフ + 5分雑談。';
  const nextActionShare = nextAction.replace(/。$/, '');

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      <section className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] p-8 md:p-12 lg:p-14">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">診断結果</p>
              <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                過去1週間の休養状況を分析しました。
                <br className="hidden lg:block" /> いまのコンディションは「{scores.ratingLabel}」。
              </h1>
            </div>
            <p className="text-white/80 leading-relaxed">
              {scores.ratingDescription} ボトルネックは<strong className="text-white"> {scores.bottleneckKpi}</strong>。
              明日の一手として<strong className="text-white"> {nextAction}</strong> を提案します。
            </p>

            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-6 px-2 rounded-full bg-white/15 text-xs font-semibold">
                  総合休養スコア
                </span>
                <span className="text-lg font-semibold text-white">{scores.restScore}/100</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-6 px-2 rounded-full bg-white/15 text-xs font-semibold">
                  疲労度
                </span>
                <span className="text-white">{scores.fatigueScore}/100</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 px-2 mt-1 rounded-full bg-white/15 text-xs font-semibold">
                  気づき
                </span>
                <span className="text-white/80 leading-relaxed">
                  {scores.ratingStars} {scores.ratingDescription}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-emerald-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                結果をシェア
              </button>
              <button
                onClick={onRestart}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/15 text-white font-semibold rounded-2xl hover:bg-white/25 transition-colors duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                もう一度診断
              </button>
              <button
                onClick={onBackHome}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/15 text-white font-semibold rounded-2xl hover:bg-white/25 transition-colors duration-200"
              >
                <Home className="w-5 h-5" />
                LPに戻る
              </button>
            </div>
          </div>

          <div className="justify-self-end w-full max-w-sm">
            <div className="bg-white text-slate-900 rounded-[32px] shadow-2xl border border-white/60 p-6 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-500 uppercase tracking-[0.3em]">総合休養スコア</p>
                  <p className="mt-2 text-5xl font-bold">{scores.restScore}<span className="text-base text-slate-500 font-semibold"> / 100</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">評価</p>
                  <p className="text-lg font-semibold text-emerald-600">{scores.ratingLabel}</p>
                  <p className="text-xs text-slate-400">{scores.ratingStars}</p>
                </div>
              </div>

              <div className="space-y-3">
                {kpiDetails.map(({ name, score, barColor }) => (
                  <div key={name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{name}</span>
                      <span className="text-slate-500">{score}/100</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`${barColor} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900">要約（2行）</p>
                  <p className="mt-1">
                    直近の休養は「{scores.ratingLabel}」。生理は〇、<span className="font-semibold text-blue-600">心理</span>と
                    <span className="font-semibold text-green-600">社会</span>が弱め。
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                  <p className="text-sm font-semibold text-emerald-700">明日の一手</p>
                  <p className="mt-1 text-slate-700">{nextAction}</p>
                </div>
                <div className="text-xs text-slate-400">
                  共有テンプレ：<em>{shareSummary} 明日の一手は{nextActionShare}。 #RestMeter</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">3つの資本の内訳</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {kpiDetails.map(({
            name,
            score,
            description,
            barColor,
            icon: Icon,
            iconBg,
            iconColor,
            accentFrom,
            accentTo
          }) => {
            const isBottleneck = name === scores.bottleneckKpi;
            return (
              <div key={name} className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm p-6 space-y-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${accentFrom} ${accentTo} opacity-60`} aria-hidden="true" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${iconBg}`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-600">{description}</p>
                        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{score}</span>
                  </div>
                  <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <div className={`${barColor} h-full rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
                  </div>
                  {isBottleneck && (
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                      ボトルネック
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ImprovementHints
        bottleneckKpi={scores.bottleneckKpi}
        bottleneckScore={scores.bottleneckScore}
        scores={scores}
      />

      {showShareModal && (
        <ShareModal scores={scores} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};
