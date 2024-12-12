import React from 'react';
import { Brain } from 'lucide-react';
import { AgeRange } from '../types/quiz';
import { ThemeToggle } from './ThemeToggle';

interface AgeSelectorProps {
  onSelectAge: (age: AgeRange) => void;
}

export const AgeSelector: React.FC<AgeSelectorProps> = ({ onSelectAge }) => {
  const ageRanges: AgeRange[] = ['4 to 6', '7 to 9', '10 to 12'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <ThemeToggle />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Brain size={24} className="sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Kids Quiz Time!</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Select your age group to start the quiz</p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {ageRanges.map((age) => (
            <button
              key={age}
              onClick={() => onSelectAge(age)}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              {age} years
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};