import React from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Heart, 
  Brain, 
  Users, 
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onStartSurvey: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSurvey }) => {
  const problems = [
    '週末に寝だめしても、月曜の朝はぐったり',
    '仕事が終わっても、頭がオンのままで休まらない',
    '甘いものや栄養ドリンクで元気を「前借り」している',
    '集中力が続かず、イライラしやすくなった',
    '軽い運動が良いと知っていても、やる気が起きない',
    '理由はわからないけど、なんとなく不調が続いている'
  ];

  const benefits = [
    {
      icon: Target,
      title: 'あなたの休養状態を「スコア化」',
      description: '曖昧な「疲れ」を総合休養スコアとして客観的に数値化。自分の現在地を正確に把握できます。'
    },
    {
      icon: TrendingUp,
      title: '休養の「ボトルネック」がわかる',
      description: '「生理的」「心理的」「社会的」の3つの資本から、あなたの弱点を特定。どこから手をつけるべきかが明確になります。'
    },
    {
      icon: Zap,
      title: 'あなたに合った「休み方」のヒントが見つかる',
      description: '診断結果に基づき、明日から実践できる具体的なアクションをご提案。「守りの休養」から「攻めの休養」へシフトしましょう。'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            寝ても、休んでも、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              なぜかダルいあなたへ。
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            たった1分でわかる、あなたの「休養スコア」
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            日本人の8割が抱える「疲れ」の正体。その原因は「休み方のミスマッチ」かもしれません。<br />
            科学的アプローチに基づいた7つの質問で、あなたの心と身体のコンディションを可視化します。
          </p>
          
          <button
            onClick={onStartSurvey}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xl font-bold rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Clock className="w-6 h-6 mr-3" />
            無料で休養スコアをチェックする
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-blue-500" />
              日本リカバリー協会提唱「休養学」準拠
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              日本疲労学会の知見を参考に開発
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              アスリートのコンディショニング理論を応用
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            こんな「隠れ疲労」、心当たりありませんか？
          </h2>
          <p className="text-lg text-gray-600">
            一つでも当てはまったら要注意。その疲れ、放置するとパフォーマンス低下だけでなく、<br />
            <span className="font-semibold text-red-600">心身の重大な不調につながるサイン</span>かもしれません。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-red-50 hover:border-red-200 transition-colors duration-200">
              <CheckCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{problem}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          「なんとなく」の不調を卒業！
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          「休養チェック」で得られる3つのこと
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-6">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          あなたの直近1週間の休養をチェック
        </h2>
        <p className="text-xl mb-2 opacity-90">
          7つの質問に5段階でお答えください
        </p>
        <p className="text-lg mb-8 opacity-80">
          所要時間：約1分
        </p>
        
        <button
          onClick={onStartSurvey}
          className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-xl font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Target className="w-6 h-6 mr-3" />
          診断を開始する
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