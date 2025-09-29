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

const calculateScores = (data) => {
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
    bottleneckKpi: bottleneck.name,
    bottleneckScore: bottleneck.score,
    ratingLevel: rating.level,
    ratingLabel: rating.label,
    ratingStars: rating.stars,
    ratingDescription: rating.description
  };
};

exports.handler = async (event) => {
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
    const result = calculateScores(sanitized);

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
