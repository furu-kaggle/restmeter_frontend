import React from 'react';
import { Activity, Heart, Users } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">休養スコア診断</h1>
              <p className="text-sm text-gray-600">科学的アプローチで疲労度を測定</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span>生理</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>心理</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-green-400" />
              <span>社会</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};