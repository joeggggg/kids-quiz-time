import React from 'react';
import { RotateCw } from 'lucide-react';

interface FlipCardProps {
  question: string;
  choices: string[];
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  question,
  choices,
  answer,
  isFlipped,
  onFlip,
}) => {
  return (
    <div className="relative w-full max-w-md aspect-[4/3] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center justify-center">
            <p className="text-lg sm:text-2xl text-center font-medium text-gray-800 dark:text-white mb-4 sm:mb-6">{question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full mb-4 sm:mb-6">
              {choices.map((choice, index) => (
                <div
                  key={index}
                  className="bg-blue-50 dark:bg-gray-700 p-2 sm:p-3 rounded-lg text-center text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium"
                >
                  {choice}
                </div>
              ))}
            </div>
            <button
              onClick={onFlip}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RotateCw size={16} className="sm:w-5 sm:h-5" />
              Flip to see answer
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-blue-50 dark:bg-gray-700 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center justify-center">
            <p className="text-base sm:text-xl text-center text-gray-800 dark:text-gray-200 mb-2">The answer is:</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4 sm:mb-6 text-center">{answer}</p>
            <button
              onClick={onFlip}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RotateCw size={16} className="sm:w-5 sm:h-5" />
              Back to question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};