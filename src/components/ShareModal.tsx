import React, { useState } from 'react';
import { X, Twitter, Copy, Check } from 'lucide-react';
import { ScoreData } from '../types';

interface ShareModalProps {
  scores: ScoreData;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ scores, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = 'http://restmeter.jp';
  const shareCtas = [
    { text: '1分休養チェック', content: 'simple-01' },
    { text: 'だるさ見える化', content: 'simple-04' },
    { text: '厚労省ベース診断', content: 'authority-01' },
    { text: '改善ヒント即届く', content: 'benefit-02' },
    { text: '寝溜めループ脱出', content: 'pain-03' },
    { text: '出社前60秒診断', content: 'fomo-04' },
    { text: '昼の集中を守る', content: 'timeofday-03' },
    { text: 'プロジェクト後半に', content: 'work_productivity-09' },
    { text: 'ランの質を保つ', content: 'athlete_fitness-02' },
    { text: '休養は設計で決まる', content: 'thread_openers-01' }
  ];

  const selectedCta = shareCtas[scores.restScore % shareCtas.length];
  const trackingUrl = baseUrl;

  const snippetBase = scores.summary.replace(/\s+/g, ' ').trim();
  const hashtag = '#休養 #休養チェック';
  const prefix = `${selectedCta.text}｜休養スコア${scores.restScore}/100（${scores.ratingLabel}）`;
  const suffix = `${trackingUrl} ${hashtag}`;

  const buildTweetText = () => {
    const MAX_LENGTH = 130; // 140字の余裕を持たせる
    let available = MAX_LENGTH - (prefix.length + suffix.length + 2);
    let snippet = snippetBase;
    if (available < 0) available = 0;
    if (snippet.length > available) {
      snippet = snippet.slice(0, Math.max(0, available));
      snippet = snippet.replace(/[、。,.\s]+$/, '');
      if (snippet.length > 0) {
        snippet += '…';
      }
    }
    const body = snippet.length > 0 ? `${prefix} ${snippet}` : prefix;
    return `${body} ${suffix}`.trim();
  };

  const tweetText = buildTweetText();

  const shareLines = [
    `総合休養スコア: ${scores.restScore}/100`,
    `コンディション: ${scores.ratingStars}（${scores.ratingLabel}）`,
    `メモ: ${scores.summary}`,
    `疲労度: ${scores.fatigueScore}/100`,
    `生理: ${scores.kpi1} / 心理: ${scores.kpi2} / 社会: ${scores.kpi3}`,
    `ボトルネック: ${scores.bottleneckKpi}`,
    '',
    `▼${selectedCta.text}`,
    trackingUrl,
    `明日の一手: ${scores.nextAction}`,
    '',
    '#休養学 #休養チェック',
  ];
  const shareText = shareLines.join('\n');

  const twitterIntentParams = new URLSearchParams({
    text: tweetText,
  });
  const twitterUrl = `https://twitter.com/intent/tweet?${twitterIntentParams.toString()}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">結果をシェア</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-1">
          {shareLines.map((line, index) => {
            if (line === trackingUrl) {
              return (
                <a
                  key={index}
                  href={trackingUrl}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {trackingUrl.replace(/^https?:\/\//, '')}
                </a>
              );
            }

            if (line === '') {
              return <div key={index} className="h-2" aria-hidden="true" />;
            }

            return (
              <p key={index} className="text-sm text-gray-700 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open(twitterUrl, '_blank')}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Xでシェア
          </button>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>

        {copied && (
          <p className="text-center text-sm text-green-600 mt-3">
            クリップボードにコピーしました！
          </p>
        )}
      </div>
    </div>
  );
};
