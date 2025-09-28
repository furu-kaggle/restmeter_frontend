import React from 'react';

interface ScoreDisplayProps {
  title: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  color: string;
  label: string;
  description?: string;
  subtitle?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  title,
  score,
  maxScore,
  icon,
  color,
  label,
  description,
  subtitle
}) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900 ml-2">{title}</h3>
        </div>
        
        {/* Circular Progress */}
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${color}`}>
                {score}
              </div>
              <div className="text-sm text-gray-500">/ {maxScore}</div>
            </div>
          </div>
        </div>

        <div className={`text-lg font-semibold ${color} mb-2`}>
          {label}
        </div>
        {description && (
          <div className="text-sm text-gray-600 mb-1">
            {description}
          </div>
        )}
        {subtitle && (
          <div className="text-sm text-gray-600">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
