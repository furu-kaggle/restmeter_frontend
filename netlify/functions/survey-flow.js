export const QUESTIONS = [
  {
    id: 'q1',
    category: '生理的資本（身体の回復）',
    text: '過去1週間、朝はすっきり目覚められた。',
    description: '起床時の体調や気分について、全体的な傾向をお答えください。'
  },
  {
    id: 'q2',
    category: '生理的資本（身体の回復）',
    text: '過去1週間、睡眠で十分に休めたと感じた。',
    description: '睡眠による疲労回復の実感について評価してください。'
  },
  {
    id: 'q3',
    category: '生理的資本（身体の回復）',
    text: '平日と休日の就寝・起床差は±90分以内が維持できた。',
    description: '規則正しい睡眠リズムの維持について評価してください。'
  },
  {
    id: 'q4',
    category: '心理的資本（心の回復）',
    text: 'オフの時間は仕事や課題を忘れて過ごせた。',
    description: '仕事からの心理的な切り替えができていたかを評価してください。'
  },
  {
    id: 'q5',
    category: '心理的資本（心の回復）',
    text: '過去1週間、感情はおおむね安定していた（イライラ/不安が少ない）。',
    description: '感情の安定性や精神的な調子について評価してください。'
  },
  {
    id: 'q6',
    category: '社会・能動的資本',
    text: '親しい人と気兼ねなく話す時間があった／満足できた。',
    description: '家族や友人との良質なコミュニケーション時間について評価してください。'
  },
  {
    id: 'q7',
    category: '社会・能動的資本',
    text: '軽い運動・ストレッチ等のアクティブレストを週2回以上行えた。',
    description: 'リフレッシュ効果のある身体活動について評価してください。'
  }
];

const TOTAL_QUESTIONS = QUESTIONS.length;

const validateAnswers = (answers) => {
  const sanitized = {};

  if (!answers || typeof answers !== 'object') {
    return sanitized;
  }

  for (const q of QUESTIONS) {
    if (Object.prototype.hasOwnProperty.call(answers, q.id)) {
      const value = Number(answers[q.id]);
      if (Number.isFinite(value) && value >= 1 && value <= 5) {
        sanitized[q.id] = value;
      }
    }
  }

  return sanitized;
};

const buildResponse = (sanitizedAnswers) => {
  const answeredInOrder = QUESTIONS.filter((q) => sanitizedAnswers[q.id] !== undefined);
  const firstUnanswered = QUESTIONS.find((q) => sanitizedAnswers[q.id] === undefined);

  if (!firstUnanswered) {
    return {
      completed: true,
      answers: sanitizedAnswers,
      total: TOTAL_QUESTIONS
    };
  }

  const currentIndex = QUESTIONS.findIndex((q) => q.id === firstUnanswered.id);
  const answeredCount = answeredInOrder.length;
  const percent = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  return {
    completed: false,
    question: {
      index: currentIndex,
      ordinal: currentIndex + 1,
      total: TOTAL_QUESTIONS,
      data: firstUnanswered
    },
    progress: {
      answered: answeredCount,
      total: TOTAL_QUESTIONS,
      percent
    },
    answers: sanitizedAnswers,
    history: answeredInOrder.map((q, index) => ({
      index,
      id: q.id,
      text: q.text,
      value: sanitizedAnswers[q.id]
    }))
  };
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
    const sanitizedAnswers = validateAnswers(payload.answers);
    const response = buildResponse(sanitizedAnswers);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Invalid request payload', error: error.message })
    };
  }
};
