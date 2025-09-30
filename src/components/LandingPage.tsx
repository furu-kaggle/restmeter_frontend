import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ClipboardList,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Target,
  HelpCircle
} from 'lucide-react';
import heroBackdrop from '../assets/images/4.webp';
import heroPhoto from '../assets/images/2.webp';
import wordmarkImage from '../assets/images/3.webp';
import emblemImage from '../assets/images/1.webp';
import leafAccent from '../assets/images/6.webp';
import restMeterSampleImage from '../assets/images/image4.webp';

interface LandingPageProps {
  onStartSurvey: () => void;
}

const ResultPreviewCard: React.FC = () => {
  const restScore = 78;
  const restMeterLabel = 'スコア60〜79';
  const barData = [
    { label: '生理的資本', value: 80, color: 'bg-red-400' },
    { label: '心理的資本', value: 60, color: 'bg-blue-400' },
    { label: '社会・能動的資本', value: 60, color: 'bg-green-400' }
  ];

  return (
    <div className="relative w-full max-w-md">
      <div
        className="absolute -inset-4 bg-gradient-to-br from-emerald-200/80 via-white to-sky-200/70 blur-2xl rounded-[36px]"
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-[32px] shadow-2xl border border-white/60 p-6 space-y-6">
        <div className="space-y-2">
          <img
            src={restMeterSampleImage}
            alt="調子メーターのイメージ"
            className="w-full h-32 rounded-2xl object-cover"
          />
          <p className="text-xs font-semibold text-emerald-600 text-right">調子メーター: {restMeterLabel}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">総合休養スコア</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {restScore}
              <span className="text-base font-semibold text-gray-500"> / 100</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-500 uppercase tracking-[0.3em]">評価</p>
            <p className="text-lg font-semibold text-emerald-600">やや良好</p>
            <p className="text-xs text-gray-400">★★★★☆</p>
          </div>
        </div>

        <div className="space-y-3">
          {barData.map((bar) => (
            <div key={bar.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{bar.label}</span>
                <span className="text-gray-500">{bar.value}/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${bar.color} h-full rounded-full transition-all duration-700`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.3em]">要約（2行）</p>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            直近の休養は「やや偏り」。生理は◎、
            <span className="font-semibold text-sky-600">心理</span>と
            <span className="font-semibold text-emerald-600">社会</span>が弱め。
          </p>
        </div>

        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
          <p className="text-sm font-semibold text-emerald-700">明日の一手</p>
          <p className="mt-1 text-sm text-gray-700">寝る90分前は画面オフ + 5分の雑談タイムで心をゆるめる。</p>
        </div>

      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSurvey }) => {
  const heroHighlights = [
    '「生きづらさスコア」を7つの質問で可視化',
    '休養学メソッドで偏りとケアの優先順位を整理',
    '結果カードで明日の一手と言葉の引き出しを提案'
  ];

  const signals = [
    '「休む＝怠ける」と思い込んだまま、頑張り続けていませんか？',
    '寝ても回復しない——日本人の約8割が同じ疲れを抱えています。',
    'スマホやPCで境界が消え、脳が休む瞬間がなくなっている。',
    '「寝ればいい」で済ませると、必要な休養タイプが欠けたままに。'
  ];

  const capabilities = [
    {
      title: '共感と翻訳',
      description: '漠然とした「生きづらさ」を言葉と数字で捉え直す'
    },
    {
      title: '科学的可視化',
      description: '3つの疲労資本×7つの休養タイプで偏りを分析'
    },
    {
      title: '明日の一手',
      description: 'あなたに合った小さな休み方を、すぐ試せる粒度で提案'
    }
  ];

  const usageSteps = [
    {
      title: '7問に回答',
      description: '直感で選ぶだけ。生きづらさの感覚を5段階でチェック'
    },
    {
      title: 'スコアを受け取る',
      description: '総合スコア／3資本ミニバー／足りない休養タイプをカード表示'
    },
    {
      title: '一手を試す＆共有',
      description: 'おすすめの休み方を実践し、必要に応じて周囲と共有'
    }
  ];

  const restTypes = [
    {
      title: '休息タイプ',
      description: '寝る前の儀式づくりやマイクロレストで脳と身体を小刻みに休ませる'
    },
    {
      title: '運動タイプ',
      description: '心拍と呼吸を整える軽い運動が、疲れにくい身体づくりにつながる'
    },
    {
      title: '栄養タイプ',
      description: '胃腸を休ませる食事術やリカバリードリンクで代謝をサポート'
    },
    {
      title: '親交タイプ',
      description: '人・自然・動物との触れ合いで情緒を安定させる'
    },
    {
      title: '娯楽タイプ',
      description: '「好き」に没頭する時間がストレスを分散し気分を整える'
    },
    {
      title: '造形・想像タイプ',
      description: '手を動かす創作や空想が脳の別回路を刺激しリセットを促す'
    },
    {
      title: '転換タイプ',
      description: '旅・模様替え・ワーケーションなど環境転換で視点をリセット'
    }
  ];

  const pillars = [
    {
      title: '生理的資本',
      description: '睡眠・体内リズム・身体回復力といったベースパワーの状態を把握'
    },
    {
      title: '心理的資本',
      description: '感情の波やメンタルの切り替え力をチェックし、心を軽くする'
    },
    {
      title: '社会・能動的資本',
      description: '人とのつながりやアクティブレストの実践度を可視化し、孤立を防ぐ'
    }
  ];

  const faq = [
    {
      question: 'どのくらい時間がかかる？',
      answer: '約1分。7問に答えるだけで「生きづらさスコア」が算出されます。'
    },
    {
      question: '回答は保存される？',
      answer: '保存しません。端末内で処理し、ページを閉じると情報は消去されます。'
    },
    {
      question: '医療用の診断ですか？',
      answer: '医療行為ではありません。疲れや生きづらさを整えるセルフケアのヒントです。体調不良時は医療機関へご相談ください。'
    }
  ];

  return (
    <div className="space-y-24 pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[48px] shadow-2xl text-white">
        <img
          src={heroBackdrop}
          alt="夜明けの空と静かな山並み"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-950/75 via-emerald-900/45 to-sky-800/40"
          aria-hidden="true"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.25fr_1fr] p-10 lg:p-16">
          <div className="space-y-8">
            <img src={wordmarkImage} alt="RestMeter ワードマーク" className="h-12 w-auto" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                今日も、なんだか
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">
                  生きづらい…
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                その正体不明の“疲れ”を、7つの質問で見える化。生きづらさの原因を休養学の視点で言語化し、次にとるべき一歩をカードで受け取れます。
              </p>
              <div className="mt-6 bg-white/10 border border-white/20 rounded-3xl p-5 space-y-2 backdrop-blur">
                <p className="text-sm md:text-base font-semibold text-white tracking-wide">
                  ”がんばってる”のに、なぜか空回り？
                </p>
                <p className="text-sm text-white/90">
                  あなたの「生きづらさスコア」を測定。
                </p>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  科学が教える、パフォーマンスを取り戻す7つの休養タイプとは？
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <Sparkles className="w-4 h-4 text-emerald-200 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={onStartSurvey}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                無料で”生きづらさ”診断を始める
              </button>
              <div className="text-xs text-white/60 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span>医療行為ではありません</span>
                <span>匿名・保存なし</span>
                <span>回答は端末内で完結</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -top-24 -right-8 hidden xl:block opacity-70">
              <img src={emblemImage} alt="RestMeter シンボル" className="w-28 h-28" />
            </div>
            <div className="relative z-10">
              <ResultPreviewCard />
            </div>
            <div className="absolute -bottom-16 -left-10 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" aria-hidden="true" />
                <img
                  src={heroPhoto}
                  alt="夜明けの森と若木"
                  className="relative w-48 h-48 rounded-3xl object-cover shadow-xl border border-white/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empathy */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            それ、あなたのせいじゃない。現代人は「休むのが下手」なだけ。
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            「休む＝怠ける」という思い込み、境界のない働き方、常時オンのデジタル環境――。積み重なった社会背景が「生きづらさ」という形で表面化しています。
          </p>

          <div className="space-y-4">
            {signals.map((signal) => (
              <div
                key={signal}
                className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/60"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{signal}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
            <img src={leafAccent} alt="葉のアイコン" className="w-6 h-6" />
            <span>
              疲れは“気分”ではなく、<strong>生理・心理・社会/能動の3資本と7つの休養タイプ</strong>が絡み合う複合課題です。
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <img
            src={heroPhoto}
            alt="朝日が昇る静かなフィールド"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0" aria-hidden="true" />
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <img
          src={emblemImage}
          alt="RestMeter シンボル"
          className="absolute -top-16 -right-16 w-40 opacity-10"
        />
        <div className="relative text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">生きづらさを科学する3つのサポート</h2>
          <p className="text-lg text-gray-600">感覚のもやもやを、共感・分析・アクションへとつなげます。</p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {capabilities.map((item, index) => (
            <div key={item.title} className="relative bg-gray-50 rounded-3xl border border-gray-100 p-6 space-y-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white text-base font-semibold shadow-lg">
                {`0${index + 1}`}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage steps */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">診断の流れ（たった3ステップ）</h2>
          <p className="text-lg text-gray-600">答える→気づく→試す。生きづらさを整えるサイクルを素早く回せます。</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {usageSteps.map((step, index) => (
            <div key={step.title} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-500 tracking-[0.3em]">STEP {index + 1}</span>
                <ClipboardList className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onStartSurvey}
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-colors duration-200"
          >
            <Target className="w-4 h-4 mr-2" />
            無料で”生きづらさ”診断を体験
          </button>
        </div>
      </section>

      {/* Result sample */}
      <section className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">「生きづらさスコア」の結果サンプル</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            調子メーターと3資本の偏りがカードに集約。弱っている休養タイプと言葉のヒントが一目で整理されます。
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-emerald-500 mt-1" />
              <span>調子メーターと総合スコアで、いまの生きづらさレベルを直感把握</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-sky-500 mt-1" />
              <span>3資本ミニバーと要約コメントで、偏りの理由を言語化</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-1" />
              <span>不足している休養タイプと「明日の一手」が自動で届く</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <ResultPreviewCard />
        </div>
      </section>

      {/* Rest Types */}
      <section className="bg-emerald-50/60 border border-emerald-100 rounded-3xl p-8 md:p-12 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">7つの休養タイプで原因を特定</h2>
          <p className="text-lg text-gray-600">
            「寝れば治る」では届かない領域までカバー。あなたの生きづらさに足りない休み方をピンポイントで導きます。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {restTypes.map((type) => (
            <div key={type.title} className="rounded-3xl bg-white border border-emerald-100 shadow-sm p-6 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
              <p className="text-gray-600 leading-relaxed">{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden">
        <img
          src={leafAccent}
          alt="葉の装飾"
          className="absolute bottom-[-40px] left-[-40px] w-48 opacity-10"
        />
        <div className="relative text-center max-w-3xl mx-auto mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">3つの疲労資本で全体像を立体把握</h2>
          <p className="text-lg text-gray-600">
            体・心・社会性のどこがダメージを受けているかを俯瞰し、優先順位を定める。休養学の核となるフレームです。
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-left space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">よくある質問</h2>
          <p className="text-lg text-gray-600">不安を解消してから、安心して診断に進めます。</p>
        </div>

        <div className="grid gap-5 max-w-3xl mx-auto">
          {faq.map((item) => (
            <div key={item.question} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-2">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-sky-500 p-10 md:p-14 text-white text-center shadow-xl">
        <img
          src={emblemImage}
          alt="RestMeter シンボル"
          className="absolute inset-0 m-auto opacity-10 w-64 h-64 pointer-events-none"
        />
        <div className="relative space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">もう「なんとなく不調」で悩まない。</h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            今日から始める「攻めの休養」で、最高のパフォーマンスと自分らしさを取り戻そう。
          </p>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            休むことは怠けではなく投資。これまでの気晴らしや習慣も、科学的な休養のひとつかもしれません。自分の状態を知り、主体的に整える一歩を踏み出しましょう。
          </p>
          <button
            onClick={onStartSurvey}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-700 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            無料で”生きづらさ”診断を始める
          </button>
          <div className="text-xs text-white/80 flex flex-wrap justify-center gap-4">
            <span>— 免責／プライバシー</span>
            <span>お問い合わせ</span>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <button
        onClick={onStartSurvey}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-semibold shadow-xl hover:bg-emerald-600 transition-transform duration-200 hover:scale-105"
        aria-label="無料で生きづらさ診断を開始する"
      >
        <MessageCircle className="w-4 h-4" />
        無料で”生きづらさ”診断
      </button>

      {/* References */}
      <section className="bg-slate-900 text-slate-200 rounded-3xl shadow-inner p-8 md:p-12 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">参考・出典</h2>
          <p className="text-sm text-slate-400">
            休養学に関する一次情報と公的機関の資料を中心に掲載しています。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="space-y-3">
            <h3 className="text-slate-100 font-semibold text-sm tracking-wide uppercase">一次情報</h3>
            <ul className="space-y-2">
              {[
                { label: '日本リカバリー協会', url: 'https://www.recovery.or.jp/' },
                { label: '日本の疲労状況2025 解説', url: 'https://www.recovery.or.jp/research/9513/' },
                { label: '日本の疲労状況2025 プレスリリース', url: 'https://www.recovery.or.jp/recobar-news/9530/' },
                { label: '休養士2級 養成講座', url: 'https://www.recovery.or.jp/kyuyo-shi2ndcourse/' },
                { label: 'HPSC トータルコンディショニング・ハンドブック', url: 'https://www.jpnsport.go.jp/hpsc/Portals/0/resources/hpsc/TCRP/handbook.pdf' },
                { label: '厚労省 健康づくりのための睡眠ガイド2023', url: 'https://www.mhlw.go.jp/content/10904750/001181265.pdf' },
                { label: '日本疲労学会', url: 'https://j-fatigue.jp/' }
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-emerald-300 hover:text-emerald-200 underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-slate-100 font-semibold text-sm tracking-wide uppercase">準一次情報</h3>
            <ul className="space-y-2">
              {[
                { label: '『休養学 あなたを疲れから救う』東洋経済STORE', url: 'https://str.toyokeizai.net/books/9784492047484/' },
                { label: '『休養学基礎』メディカ出版', url: 'https://store.medica.co.jp/item/302260250' }
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-emerald-300 hover:text-emerald-200 underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-slate-100 font-semibold text-sm tracking-wide uppercase">二次解説</h3>
            <ul className="space-y-2">
              {[
                { label: 'こがゆう：『休養学』要約（note）', url: 'https://note.com/koga_yu/n/ndb0a090e4caf' },
                { label: 'こがゆうブログ（プロフィール）', url: 'https://kogayu-blog.com/profile/' }
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-emerald-300 hover:text-emerald-200 underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          掲載リンクは2025年9月時点の情報です。最新の内容は各機関の公式発表をご確認ください。
        </p>
      </section>
    </div>
  );
};
