import React from 'react';
import { Heart, Activity, Users } from 'lucide-react';

interface KpiChartProps {
  kpi1: number; // 生理的資本
  kpi2: number; // 心理的資本
  kpi3: number; // 社会・能動的資本
}

export const KpiChart: React.FC<KpiChartProps> = ({ kpi1, kpi2, kpi3 }) => {
  const kpiData = [
    { name: '生理的資本', value: kpi1, icon: Heart, color: 'bg-red-400', bgColor: 'bg-red-50' },
    { name: '心理的資本', value: kpi2, icon: Activity, color: 'bg-blue-400', bgColor: 'bg-blue-50' },
    { name: '社会・能動的資本', value: kpi3, icon: Users, color: 'bg-green-400', bgColor: 'bg-green-50' },
  ];

  return (
    <div className="space-y-4">
      {kpiData.map((kpi, index) => (
        <div key={kpi.name} className={`p-4 rounded-xl ${kpi.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <kpi.icon className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">{kpi.name}</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{kpi.value}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`${kpi.color} h-3 rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: `${kpi.value}%`,
                animationDelay: `${index * 200}ms`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};