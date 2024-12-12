export type AgeRange = '4 to 6' | '7 to 9' | '10 to 12';

export interface QuizQuestion {
  id: number;
  question: string;
  choice: string[];
  answer: string;
  category: string;
}

export interface Quiz {
  quizId: string;
  testerAge: string;
  questionQty: number;
  quizType: string;
  questions: QuizQuestion[];
}

export interface QuizState {
  currentIndex: number;
  questions: QuizQuestion[];
  isFlipped: boolean;
  ageRange: AgeRange | null;
  isLoading: boolean;
  error: string | null;
  quiz: Quiz | null;
}