import React from 'react';
import { Brain } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center">
        <Brain size={48} className="text-blue-500 animate-bounce mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating Your Quiz</h2>
        <p className="text-gray-600">Please wait while we prepare some fun questions...</p>
      </div>
    </div>
  );
};