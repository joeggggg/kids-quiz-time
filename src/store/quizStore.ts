import { create } from 'zustand';
import { AgeRange, QuizState } from '../types/quiz';
import { retryQuizGeneration } from '../services/gemini';
import { logger } from '../utils/logger';

export const useQuizStore = create<QuizState>((set) => ({
  currentIndex: 0,
  questions: [],
  isFlipped: false,
  ageRange: null,
  isLoading: false,
  error: null,
  quiz: null,

  setAgeRange: async (age: AgeRange) => {
    set({ isLoading: true, error: null, ageRange: age });
    
    try {
      const quiz = await retryQuizGeneration(age);
      logger.info('Quiz loaded successfully', { age });
      
      set({ 
        quiz, 
        isLoading: false, 
        currentIndex: 0, 
        isFlipped: false,
        error: null 
      });
    } catch (error) {
      const errorMessage = 'Failed to generate quiz. Please try again.';
      logger.error(errorMessage, { error, age });
      
      set({ 
        error: errorMessage,
        isLoading: false 
      });
    }
  },

  nextQuestion: () => 
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, (state.quiz?.questions.length || 1) - 1),
      isFlipped: false,
    })),

  previousQuestion: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
      isFlipped: false,
    })),

  toggleFlip: () =>
    set((state) => ({
      isFlipped: !state.isFlipped,
    })),
}));