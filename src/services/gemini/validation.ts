import { Quiz } from '../../types/quiz';
import { logger } from '../../utils/logger';

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

export function validateResponse(response: string): Quiz {
  try {
    const quiz = JSON.parse(response);
    
    if (!quiz || typeof quiz !== 'object') {
      throw new ValidationError('Invalid quiz format', quiz);
    }

    const requiredFields = ['quizId', 'testerAge', 'questionQty', 'questions'];
    for (const field of requiredFields) {
      if (!(field in quiz)) {
        throw new ValidationError(`Missing required field: ${field}`, quiz);
      }
    }

    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      throw new ValidationError('Questions must be a non-empty array', quiz);
    }

    return quiz;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError('Failed to parse quiz response', { error, response });
  }
}