import React from 'react';
import { QuizContainer } from './components/QuizContainer';
import { AgeSelector } from './components/AgeSelector';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { useQuizStore } from './store/quizStore';

function App() {
  const { ageRange, isLoading, quiz, error, setAgeRange } = useQuizStore();

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <ErrorMessage message={error} onRetry={() => setAgeRange(ageRange!)} />
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <LoadingScreen />
        </div>
        <Footer />
      </div>
    );
  }

  if (!ageRange || !quiz) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <AgeSelector onSelectAge={setAgeRange} />
        </div>
        <Footer />
      </div>
    );
  }

  return <QuizContainer />;
}

export default App;