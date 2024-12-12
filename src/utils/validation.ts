import { Quiz, QuizQuestion } from '../types/quiz';
import { logger } from './logger';

/**
 * Validates a quiz question structure
 */
export function validateQuizQuestion(question: any): question is QuizQuestion {
  const isValid = 
    typeof question.id === 'number' &&
    typeof question.question === 'string' &&
    Array.isArray(question.choice) &&
    question.choice.length >= 2 &&
    typeof question.answer === 'string' &&
    typeof question.category === 'string';

  if (!isValid) {
    logger.warn('Invalid question structure', { question });
  }

  return isValid;
}

/**
 * Validates the complete quiz structure
 */
export function validateQuizStructure(quiz: any): quiz is Quiz {
  const isValid = 
    quiz &&
    typeof quiz.quizId === 'string' &&
    typeof quiz.testerAge === 'string' &&
    typeof quiz.questionQty === 'number' &&
    Array.isArray(quiz.questions) &&
    quiz.questions.every(validateQuizQuestion);

  if (!isValid) {
    logger.warn('Invalid quiz structure', { quiz });
  }

  return isValid;
}