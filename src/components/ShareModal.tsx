import React, { useState } from 'react';
import { X, Twitter, Copy, Check } from 'lucide-react';
import { ScoreData } from '../types';

interface ShareModalProps {
  scores: ScoreData;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ scores, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const shareText = `私の休養スコアは ${scores.restScore}/100、疲労度 ${scores.fatigueScore}/100。
生理${scores.kpi1} / 心理${scores.kpi2} / 社会${scores.kpi3}。
ボトルネック：${scores.bottleneckKpi}
#休養学 #休養チェック`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

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

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {shareText}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open(twitterUrl, '_blank')}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Twitterでシェア
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