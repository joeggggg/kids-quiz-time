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
    <div className="flex items-center justify-between w-full max-w-md mt-8">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
        Previous
      </button>
      <span className="text-gray-600">
        {currentIndex + 1} / {totalQuestions}
      </span>
      <button
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
};