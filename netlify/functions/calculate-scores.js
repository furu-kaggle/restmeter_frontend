const getRating = (score) => {
  if (score >= 85) {
    return {
      level: 5,
      stars: '★★★★★',
      label: 'とても良い',
      description: 'しっかり休めている状態'
    };
  }
  if (score >= 70) {
    return {
      level: 4,
      stars: '★★★★☆',
      label: '良好',
      description: 'パフォーマンスを維持できる状態'
    };
  }
  if (score >= 55) {
    return {
      level: 3,
      stars: '★★★☆☆',
      label: '回復途上',
      description: '休養リズムの調整でさらに整えたい'
    };
  }
  if (score >= 40) {
    return {
      level: 2,
      stars: '★★☆☆☆',
      label: '注意が必要',
      description: '疲労サインに早めに向き合うタイミング'
    };
  }
  return {
    level: 1,
    stars: '★☆☆☆☆',
    label: '高疲労リスク',
    description: 'まずは休養戦略を見直そう'
  };
};

const validateSurvey = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid payload');
  }

  const keys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const sanitized = {};

  for (const key of keys) {
    const value = Number(data[key]);
    if (!Number.isFinite(value) || value < 1 || value > 5) {
      throw new Error(`Invalid value for ${key}`);
    }
    sanitized[key] = value;
  }

  return sanitized;
};

const buildSummaryFallback = (scores) => {
  const ratingSummary = {
    'とても良い': '休養は安定しており、エネルギーを蓄えた状態です。',
    '良好': '全体的に良いバランスですが、小さな改善でさらに整います。',
    '回復途上': '休養リズムを整える途中段階。もう一歩で安定域に乗れそうです。',
    '注意が必要': '疲労サインが目立ち始めています。休み方の調整が必要です。',
    '高疲労リスク': '休養不足が蓄積している可能性があります。早急な立て直しを。'
  };

  const bottleneckSummary = {
    '生理的資本': '生理的資本を優先して、睡眠・体内リズムの回復に集中しましょう。',
    '心理的資本': '心理的資本が鍵です。オンとオフの切り替えを意識的に。',
    '社会・能動的資本': '社会・能動的資本がボトルネック。人とのつながりやアクティブレストを補いましょう。'
  };

  const base = ratingSummary[scores.ratingLabel] || '直近の休養はバランスを探る段階です。';
  const detail = bottleneckSummary[scores.bottleneckKpi] || '';

  return `${base}${detail ? ' ' + detail : ''}`;
};

const buildNextActionFallback = (scores) => {
  const level = (() => {
    if (scores.bottleneckScore >= 75) return 'maintain';
    if (scores.bottleneckScore >= 60) return 'fineTune';
    if (scores.bottleneckScore >= 45) return 'focus';
    return 'recover';
  })();

  const actions = {
    '生理的資本': {
      recover: '寝る90分前のスクリーンオフと湯船入浴で睡眠の質を底上げしよう。',
      focus: '就寝・起床の時間を固定し、週2回以上の軽い運動を追加しよう。',
      fineTune: '寝る前のストレッチや深呼吸で緊張をほどき、眠りの質をキープしよう。',
      maintain: '現在の睡眠リズムを維持しつつ、休日も±90分以内の起床を意識しよう。'
    },
    '心理的資本': {
      recover: '仕事終わりにデジタルデトックス20分＋短い散歩でオン/オフを切り替えよう。',
      focus: '1日の終わりに手書きジャーナルで感情の棚卸しをしよう。',
      fineTune: 'オフ時間に没頭できる趣味やリラックス時間を30分確保しよう。',
      maintain: '切り替えの儀式（音楽・シャワーなど）を継続し、集中とリラックスのメリハリを保とう。'
    },
    '社会・能動的資本': {
      recover: '信頼できる人との15分雑談と、週1のアクティブレストを予定に組み込もう。',
      focus: '週末に自然の中を歩く・軽い運動をする時間を確保しよう。',
      fineTune: 'オンラインでもよいので気軽なコミュニケーション機会を1つ増やそう。',
      maintain: '今のつながりと運動習慣を維持しつつ、新しいアクティブレストにも挑戦しよう。'
    }
  };

  const byKpi = actions[scores.bottleneckKpi];
  if (!byKpi) {
    return '今日の休み方を振り返り、身体・心・つながりのバランスを整えよう。';
  }

  return byKpi[level] || byKpi.focus;
};

const calculateScoresCore = (data) => {
  const rawTotal = data.q1 + data.q2 + data.q3 + data.q4 + data.q5 + data.q6 + data.q7;
  const restScore = Math.round(((rawTotal - 7) / 28) * 100);
  const fatigueScore = 100 - restScore;

  const kpi1 = Math.round(((data.q1 + data.q2 + data.q3) - 3) / 12 * 100);
  const kpi2 = Math.round(((data.q4 + data.q5) - 2) / 8 * 100);
  const kpi3 = Math.round(((data.q6 + data.q7) - 2) / 8 * 100);

  const kpiScores = [
    { name: '生理的資本', score: kpi1 },
    { name: '心理的資本', score: kpi2 },
    { name: '社会・能動的資本', score: kpi3 }
  ];

  const bottleneck = kpiScores.reduce((min, current) => (current.score < min.score ? current : min));
  const rating = getRating(restScore);

  return {
    restScore,
    fatigueScore,
    kpi1,
    kpi2,
    kpi3,
    bottleneck,
    ratingLevel: rating.level,
    ratingLabel: rating.label,
    ratingStars: rating.stars,
    ratingDescription: rating.description
  };
};

const buildAiInsights = async (scoreSummary) => {
  const fallback = {
    summary: buildSummaryFallback(scoreSummary),
    nextAction: buildNextActionFallback(scoreSummary)
  };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallback;
  }

  const systemPrompt = `あなたは、休養学とトータルコンディショニングに精通した専門家AIです。日本リカバリー協会の休養タイプやトータルコンディショニング理論を踏まえ、提供されたスコアから診断結果の「要約」と「明日の一手」を生成してください。専門用語を避け、科学的根拠に基づいた親しみやすい表現を使います。`;

  const userPrompt = `入力データ:\n- 総合休養スコア: ${scoreSummary.restScore}/100\n- 評価: ${scoreSummary.ratingLabel}\n- 疲労度: ${scoreSummary.fatigueScore}/100\n- 生理的資本スコア: ${scoreSummary.kpi1}\n- 心理的資本スコア: ${scoreSummary.kpi2}\n- 社会・能動的資本スコア: ${scoreSummary.kpi3}\n- ボトルネック: ${scoreSummary.bottleneckKpi}\n- 分析期間: 過去1週間\n\n要約と明日の一手を以下のルールで出力してください。\n- 要約: 2文構成。1文目で総合評価とバランスを肯定的に伝え、2文目でボトルネックと改善方針を提示。\n- 明日の一手: ボトルネック改善に直結する、明日すぐ実践できる具体的な行動と理由を簡潔に。\n\nJSON形式で {"要約":"...","明日の一手":"..."} を返してください。`;

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        input: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const outputText = data.output_text || data.output?.[0]?.content?.[0]?.text;
    if (!outputText) {
      return fallback;
    }

    const parsed = JSON.parse(outputText);
    if (!parsed['要約'] || !parsed['明日の一手']) {
      return fallback;
    }

    return {
      summary: String(parsed['要約']).trim(),
      nextAction: String(parsed['明日の一手']).trim()
    };
  } catch (error) {
    console.error('OpenAI generation failed', error);
    return fallback;
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const sanitized = validateSurvey(payload);
    const baseScores = calculateScoresCore(sanitized);

    const aiInput = {
      restScore: baseScores.restScore,
      fatigueScore: baseScores.fatigueScore,
      kpi1: baseScores.kpi1,
      kpi2: baseScores.kpi2,
      kpi3: baseScores.kpi3,
      bottleneckKpi: baseScores.bottleneck.name,
      bottleneckScore: baseScores.bottleneck.score,
      ratingLabel: baseScores.ratingLabel
    };

    const { summary, nextAction } = await buildAiInsights(aiInput);

    const result = {
      restScore: baseScores.restScore,
      fatigueScore: baseScores.fatigueScore,
      kpi1: baseScores.kpi1,
      kpi2: baseScores.kpi2,
      kpi3: baseScores.kpi3,
      bottleneckKpi: baseScores.bottleneck.name,
      bottleneckScore: baseScores.bottleneck.score,
      ratingLevel: baseScores.ratingLevel,
      ratingLabel: baseScores.ratingLabel,
      ratingStars: baseScores.ratingStars,
      ratingDescription: baseScores.ratingDescription,
      summary,
      nextAction
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: error.message || 'Invalid payload' })
    };
  }
};
