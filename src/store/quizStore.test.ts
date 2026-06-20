import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizStore } from './quizStore';

describe('useQuizStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useQuizStore.setState({
      currentIndex: 0,
      questions: [],
      isFlipped: false,
      ageRange: null,
      isLoading: false,
      error: null,
      quiz: null,
    });
  });

  it('should initialize with default state', () => {
    const state = useQuizStore.getState();
    expect(state.currentIndex).toBe(0);
    expect(state.isFlipped).toBe(false);
    expect(state.ageRange).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.quiz).toBeNull();
  });

  it('should toggle isFlipped state', () => {
    expect(useQuizStore.getState().isFlipped).toBe(false);
    useQuizStore.getState().toggleFlip();
    expect(useQuizStore.getState().isFlipped).toBe(true);
    useQuizStore.getState().toggleFlip();
    expect(useQuizStore.getState().isFlipped).toBe(false);
  });

  it('should navigate next and previous question correctly within bounds', () => {
    // Mock a quiz with 3 questions
    const mockQuestions = [
      { id: 1, question: 'Q1', choice: ['A', 'B'], answer: 'A', category: 'Science' },
      { id: 2, question: 'Q2', choice: ['A', 'B'], answer: 'B', category: 'Math' },
      { id: 3, question: 'Q3', choice: ['A', 'B'], answer: 'A', category: 'Tech' },
    ];
    useQuizStore.setState({
      quiz: {
        quizId: 'test-quiz',
        testerAge: '7 to 9',
        questionQty: 3,
        quizType: 'STEAM',
        questions: mockQuestions,
      },
      currentIndex: 0,
    });

    // Go next
    useQuizStore.getState().nextQuestion();
    expect(useQuizStore.getState().currentIndex).toBe(1);

    // Go next again
    useQuizStore.getState().nextQuestion();
    expect(useQuizStore.getState().currentIndex).toBe(2);

    // Go next past bounds
    useQuizStore.getState().nextQuestion();
    expect(useQuizStore.getState().currentIndex).toBe(2);

    // Go previous
    useQuizStore.getState().previousQuestion();
    expect(useQuizStore.getState().currentIndex).toBe(1);

    // Go previous again
    useQuizStore.getState().previousQuestion();
    expect(useQuizStore.getState().currentIndex).toBe(0);

    // Go previous below bounds
    useQuizStore.getState().previousQuestion();
    expect(useQuizStore.getState().currentIndex).toBe(0);
  });
});
