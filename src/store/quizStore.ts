import { create } from 'zustand';
import { AgeRange, QuizState } from '../types/quiz';
import { generateQuiz } from '../services/gemini';

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
      const quiz = await generateQuiz(age);
      set({ 
        quiz, 
        isLoading: false, 
        currentIndex: 0, 
        isFlipped: false,
        error: null 
      });
    } catch (error) {
      console.error('Quiz generation error:', error);
      set({ 
        error: 'Something went wrong while generating the quiz. Please try again.',
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