import { Quiz } from '../types/quiz';
import { quizData } from '../data/questions';
import { logger } from './logger';

/**
 * Creates a fallback quiz when AI generation fails
 * @param ageRange - The target age range for the quiz
 * @returns Quiz - A fallback quiz object
 */
export function createFallbackQuiz(ageRange: string): Quiz {
  logger.info('Using fallback quiz', { ageRange });
  
  return {
    ...quizData,
    testerAge: ageRange,
    quizId: `Q${Date.now()}`,
  };
}