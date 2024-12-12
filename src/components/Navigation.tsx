import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
  currentIndex,
  totalQuestions,
}) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mt-4 sm:mt-8 px-2 sm:px-0">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {currentIndex + 1} / {totalQuestions}
      </span>
      <button
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};