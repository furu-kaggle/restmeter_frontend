import React from 'react';
import {
  ArrowRight,
  CheckCircle,
  Brain,
  Users,
  ClipboardList,
  Target,
  Clock,
  Activity,
  Sparkles,
  Heart
} from 'lucide-react';

interface LandingPageProps {
  onStartSurvey: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSurvey }) => {
  const awarenessPoints = [
    '「なんとなくダルい」を言い換えてみると、休養のヒントが見えてくる',
    '疲れを言語化しておくと、自分の限界や休むタイミングを他者に伝えやすい',
    '数値化・可視化は、セルフマネジメントの第一歩'
  ];

  const restShifts = [
    {
      icon: Sparkles,
      label: '休む=寝るだけ？',
      description: '睡眠だけでなく、趣味や創作で頭を切り替える「転換タイプ」の休養も回復を後押し'
    },
    {
      icon: Users,
      label: '孤独な休養は限界',
      description: '信頼できる人との会話や緩やかなつながりが「親交タイプ」の休養として心を整える'
    },
    {
      icon: Activity,
      label: '動くほど疲れる？',
      description: '血流を促す軽い運動やストレッチは「運動タイプ」の休養。翌日のダルさを減らします'
    }
  ];

  const athleteInsights = [
    {
      title: 'アスリートは疲れのログを付けている',
      description: 'トレーニングだけでなく、睡眠時間や気分、疲労度を記録。あなたの仕事にも応用できます。'
    },
    {
      title: '次のパフォーマンスは、前日の休養で決まる',
      description: '試合前の栄養補給やメンタル調整のように、翌日の商談・プレゼンへの準備として休養を設計しましょう。'
    },
    {
      title: 'コンディション管理はチーム戦',
      description: 'アスリートは専門スタッフと管理。ビジネスパーソンも仲間や家族と疲れの共有を習慣化することで回復力が高まります。'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            あなたのその疲れ、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              言葉にできますか？
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            7つの質問で「疲れの現在地」を数値化し、言語化するための診断ツール
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            仕事終わりのモヤモヤ、休日のだるさ。その正体を見える化して、自分に合った休み方を見つけましょう。
            休養学の観点から、身体・心・社会的アクションの3つの資本でコンディションをチェックします。
          </p>
          
          <button
            onClick={onStartSurvey}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xl font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Clock className="w-6 h-6 mr-3" />
            無料で休養スコアをチェックする
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {awarenessPoints.map((point, index) => (
              <div key={index} className="flex items-start bg-white bg-opacity-60 rounded-2xl p-4 shadow-sm">
                <ClipboardList className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 言語化セクション */}
      <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            疲れを言語化するところから、整えるチャンスが始まる
          </h2>
          <p className="text-lg text-gray-600">
            最近の自分を言葉にすると、休養の優先順位が見えてきます。診断ではこの3つの視点でチェックします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            '週末に寝ても、月曜日の朝は体が重い',
            '仕事モードが頭から抜けず、休みの日も気持ちが落ち着かない',
            '疲労を言葉で説明できず、いつも我慢してしまう',
            '「休みたい」と伝えるよりも先に、頑張ることを選んでしまう'
          ].map((statement, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
            >
              <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{statement}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 新しい休養常識セクション */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          休む=寝るだけ、はもう終わり。
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          休養学が示す「攻めの休養」で、あなたの回復をアップデート。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {restShifts.map(({ icon: Icon, label, description }, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {label}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* アスリート知見セクション */}
      <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            アスリートのリカバリー術をあなたの日常に
          </h2>
          <p className="text-lg text-gray-600">
            ハイパフォーマンスを支える休養メソッドを、ビジネスや家事にも取り入れられる形でご紹介。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {athleteInsights.map((insight, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {insight.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          直近1週間の休養をスコア化し、言葉にしよう
        </h2>
        <p className="text-xl mb-2 opacity-90">
          7つの質問に5段階で答えるだけ。約1分で結果が届きます。
        </p>
        <p className="text-lg mb-8 opacity-80">
          結果は5段階のコンディション評価とともに、明日からの改善ヒントをお届け。
        </p>

        <button
          onClick={onStartSurvey}
          className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-xl font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Target className="w-6 h-6 mr-3" />
          診断を始める
          <ArrowRight className="w-6 h-6 ml-3" />
        </button>
      </section>

      {/* Three Pillars */}
      <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            3つの資本で休養を科学的に分析
          </h2>
          <p className="text-lg text-gray-600">
            あなたの疲労を多角的に評価し、最適な改善策を提案します
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-red-50 border border-red-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">生理的資本</h3>
            <p className="text-gray-600 leading-relaxed">
              睡眠の質、体内リズム、身体の回復状況を評価。基本的な生理機能の健全性を測定します。
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-blue-50 border border-blue-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">心理的資本</h3>
            <p className="text-gray-600 leading-relaxed">
              仕事からの切り替え、感情の安定性を評価。メンタルヘルスの状態を客観的に把握します。
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-green-50 border border-green-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">社会・能動的資本</h3>
            <p className="text-gray-600 leading-relaxed">
              人とのつながり、アクティブレストの実践状況を評価。積極的な休養の取り組みを測定します。
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          休養は、未来への「投資」。
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          最高のパフォーマンスは、最高の休養から生まれる。
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          この診断は、あなたの休養を見直すための第一歩です。日本人は「休むのが下手」と言われますが、それは「休み方」を知らないだけかもしれません。<br />
          <span className="font-semibold">「平日5日間のために、週末2日間で充電する」</span>という新しい発想で、あなたらしい最高の休み方を見つけていきましょう。
        </p>
        
        <button
          onClick={onStartSurvey}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xl font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          今すぐ診断を開始する
          <ArrowRight className="w-6 h-6 ml-3" />
        </button>
      </section>
    </div>
  );
};
