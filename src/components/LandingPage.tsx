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

interface LandingPageProps {
  onStartSurvey: () => void;
}

const ResultPreviewCard: React.FC = () => {
  const barData = [
    { label: '生理的資本', value: '80/100', width: '80%', color: 'bg-red-400' },
    { label: '心理的資本', value: '60/100', width: '60%', color: 'bg-blue-400' },
    { label: '社会・能動的資本', value: '60/100', width: '60%', color: 'bg-green-400' }
  ];

  return (
    <div className="relative w-full max-w-md">
      <div
        className="absolute -inset-4 bg-gradient-to-br from-emerald-200/80 via-white to-sky-200/70 blur-2xl rounded-[36px]"
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-[32px] shadow-2xl border border-white/60 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.2em]">総合休養スコア</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              78<span className="text-base font-semibold text-gray-500"> / 100</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-500 uppercase tracking-[0.3em]">評価</p>
            <p className="text-lg font-semibold text-emerald-600">やや良好</p>
          </div>
        </div>

        <div className="space-y-3">
          {barData.map((bar) => (
            <div key={bar.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{bar.label}</span>
                <span className="text-gray-500">{bar.value}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${bar.color} h-full rounded-full transition-all duration-700`}
                  style={{ width: bar.width }}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.3em]">要約（2行）</p>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            直近の休養は「やや偏り」。生理は〇、
            <span className="font-semibold text-sky-600">心理</span>と
            <span className="font-semibold text-emerald-600">社会</span>が弱め。
          </p>
        </div>

        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
          <p className="text-sm font-semibold text-emerald-700">明日の一手</p>
          <p className="mt-1 text-sm text-gray-700">寝る90分前は画面オフ + 5分雑談。</p>
        </div>

      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSurvey }) => {
  const heroHighlights = [
    '7つの質問で休養スコアと疲労タイプを言語化',
    '匿名・1分・端末内完結のセルフチェック',
    '3資本の偏りと明日の一手を1カードで提示'
  ];

  const signals = [
    '週末に寝ても、月曜の朝は体が重い',
    '休みでも頭が仕事モードのまま落ち着かない',
    '疲れを言葉にできず、つい我慢してしまう',
    '「休む＝寝るだけ」になりがちで回復感がない'
  ];

  const capabilities = [
    {
      title: '言語化',
      description: '疲れの中身と伝え方がハッキリする'
    },
    {
      title: '可視化',
      description: '3資本の偏りを1枚のカードで把握'
    },
    {
      title: '次の一手',
      description: '明日から試せるアクションを1つだけ提案'
    }
  ];

  const usageSteps = [
    {
      title: '7問に回答',
      description: '感覚的な疲れを 5 段階評価で答えるだけ'
    },
    {
      title: '結果が 1 枚で届く',
      description: '総合スコア／3資本ミニバー／2行要約／明日の一手'
    },
    {
      title: '一手を試す＆シェア',
      description: '改善アクションを試し、必要に応じて周囲へ共有'
    }
  ];

  const pillars = [
    {
      title: '生理的資本',
      description: '睡眠の質／体内リズム／身体回復の状態を把握'
    },
    {
      title: '心理的資本',
      description: '仕事からの切り替えや感情の安定をチェック'
    },
    {
      title: '社会・能動的資本',
      description: '人とのつながり・アクティブレストの実践度を計測'
    }
  ];

  const faq = [
    {
      question: 'どのくらい時間がかかる？',
      answer: '約1分、7問に答えるだけです。'
    },
    {
      question: '回答は保存される？',
      answer: '保存しません。端末内で処理し、ページを閉じれば消えます。'
    },
    {
      question: '医療用の診断ですか？',
      answer: 'いいえ。自己管理の参考情報です。体調不良時は医療機関へご相談ください。'
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
                あなたのその疲れ、
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">
                  言葉にできますか？
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                7つの質問で疲れの現在地をスコア化し、伝えやすい言葉に翻訳。コンディションの偏りと明日の一手が、1枚のカードで手元に届きます。
              </p>
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
                1分で診断を始める
              </button>
              <div className="text-xs text-white/60 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span>医療行為ではありません</span>
                <span>回答は端末内処理</span>
                <span>個人情報の保存なし</span>
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

      {/* Signals */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">こんなサイン、ありませんか？</h2>
          <p className="text-lg text-gray-600">
            当てはまるほど、疲れの言語化と優先順位づけが必要なサイン。モヤモヤした違和感を言葉と数字に変えると、次の一手が見えてきます。
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
              疲れは“気分”ではなく、<strong>生理・心理・社会/能動の3つの資本</strong>が絡む複合課題です。
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">この診断でできること</h2>
          <p className="text-lg text-gray-600">3つのアプローチで「疲れの現在地」を翻訳します。</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">使い方（3ステップ）</h2>
          <p className="text-lg text-gray-600">診断から実践、共有まで最短ルートで支援します。</p>
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
            今すぐ1分で診断
          </button>
        </div>
      </section>

      {/* Result sample */}
      <section className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">結果サンプル（イメージ）</h2>
          <p className="text-lg text-gray-600">
            総合スコアと3資本のバランス、明日の一手を1枚のカードで確認できます。
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-emerald-500 mt-1" />
              <span>休養スコア：78 / 100 ｜ 評価：やや良好</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-sky-500 mt-1" />
              <span>弱みがひと目でわかる 3 資本ミニバーと 2 行の要約</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-1" />
              <span>明日の一手の提案が自動生成される</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <ResultPreviewCard />
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">なぜ当たる？（3資本の考え方）</h2>
          <p className="text-lg text-gray-600">
            寝るだけじゃ足りない。切り替えとつながりも“休む力”。3つの資本で偏りを立体的に分析します。
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
          <h2 className="text-3xl md:text-4xl font-bold">最高のパフォーマンスは、最高の休養から。</h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            「疲れの現在地」を言葉にするところから、整えるチャンスが始まります。
          </p>
          <button
            onClick={onStartSurvey}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-700 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            今すぐ1分診断を始める
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
        aria-label="1分で診断を開始する"
      >
        <MessageCircle className="w-4 h-4" />
        1分で診断
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
