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

function isValidQuizStructure(quiz: unknown): quiz is Quiz {
  if (!quiz || typeof quiz !== 'object') {
    logger.warn('Quiz response is not an object', { quiz });
    return false;
  }
  const qObj = quiz as Record<string, unknown>;

  const questions = qObj.questions;
  const hasRequiredFields = 
    typeof qObj.quizId === 'string' &&
    typeof qObj.testerAge === 'string' &&
    typeof qObj.questionQty === 'number' &&
    Array.isArray(questions);

  if (!hasRequiredFields || !Array.isArray(questions)) {
    logger.warn('Missing required quiz fields', { quiz });
    return false;
  }

  const hasValidQuestions = questions.every((q: unknown) => {
    if (!q || typeof q !== 'object') return false;
    const qItem = q as Record<string, unknown>;
    return (
      typeof qItem.id === 'number' &&
      typeof qItem.question === 'string' &&
      Array.isArray(qItem.choice) &&
      qItem.choice.length >= 2 &&
      typeof qItem.answer === 'string' &&
      typeof qItem.category === 'string'
    );
  });

  if (!hasValidQuestions) {
    logger.warn('Invalid question structure found', { questions });
    return false;
  }

  return true;
}