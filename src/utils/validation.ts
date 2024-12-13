import { Quiz } from '../types/quiz';
import { logger } from './logger';

export class ValidationError extends Error {
  constructor(message: string, public data?: unknown) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateApiKey(apiKey: string | undefined): apiKey is string {
  if (!apiKey) {
    throw new ValidationError('Gemini API key is required');
  }
  return true;
}

export function validateQuizResponse(response: string): Quiz {
  try {
    const quiz = JSON.parse(response);
    
    if (!isValidQuizStructure(quiz)) {
      throw new ValidationError('Invalid quiz structure', quiz);
    }
    
    return quiz;
  } catch (error) {
    logger.error('Failed to validate quiz response', { error, response });
    throw new ValidationError('Invalid quiz response', { error, response });
  }
}

function isValidQuizStructure(quiz: any): quiz is Quiz {
  const hasRequiredFields = 
    quiz &&
    typeof quiz.quizId === 'string' &&
    typeof quiz.testerAge === 'string' &&
    typeof quiz.questionQty === 'number' &&
    Array.isArray(quiz.questions);

  if (!hasRequiredFields) {
    logger.warn('Missing required quiz fields', { quiz });
    return false;
  }

  const hasValidQuestions = quiz.questions.every((q: any) =>
    typeof q.id === 'number' &&
    typeof q.question === 'string' &&
    Array.isArray(q.choice) &&
    q.choice.length >= 2 &&
    typeof q.answer === 'string' &&
    typeof q.category === 'string'
  );

  if (!hasValidQuestions) {
    logger.warn('Invalid question structure found', { questions: quiz.questions });
    return false;
  }

  return true;
}