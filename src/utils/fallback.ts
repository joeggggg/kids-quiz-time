import { Quiz } from '../types/quiz';
import { quizData } from '../data/questions';
import { logger } from './logger';

/**
 * Creates a fallback quiz when AI generation fails
 */
export function createFallbackQuiz(ageRange: string): Quiz {
  logger.info('Using fallback quiz', { ageRange });
  
  return {
    ...quizData,
    testerAge: ageRange,
    quizId: `Q${Date.now()}`,
  };
}