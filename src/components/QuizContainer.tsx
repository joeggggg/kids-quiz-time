import React from 'react';
import { FlipCard } from './FlipCard';
import { Navigation } from './Navigation';
import { Brain, RotateCcw } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { Footer } from './Footer';
import { ThemeToggle } from './ThemeToggle';

export const QuizContainer: React.FC = () => {
  const { 
    currentIndex, 
    isFlipped, 
    quiz, 
    ageRange,
    nextQuestion, 
    previousQuestion, 
    toggleFlip,
    setAgeRange 
  } = useQuizStore();

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentIndex];

  const handleRestart = () => {
    if (ageRange) {
      setAgeRange(ageRange);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-12 px-4 flex flex-col">
      <ThemeToggle />
      <div className="flex-grow max-w-4xl mx-auto w-full">
        <div className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Brain size={24} className="sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white">Kids Quiz Time!</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">For ages {quiz.testerAge}</p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Flip the cards to learn something new!</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4">
            <span className="inline-block px-3 sm:px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-xs sm:text-sm font-medium">
              {currentQuestion.category}
            </span>
          </div>

          <FlipCard
            question={currentQuestion.question}
            choices={currentQuestion.choice}
            answer={currentQuestion.answer}
            isFlipped={isFlipped}
            onFlip={toggleFlip}
          />

          <Navigation
            onPrevious={previousQuestion}
            onNext={nextQuestion}
            currentIndex={currentIndex}
            totalQuestions={quiz.questions.length}
          />

          <button
            onClick={handleRestart}
            className="mt-6 sm:mt-8 flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 dark:bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={16} className="sm:w-5 sm:h-5" />
            Start New Quiz
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};