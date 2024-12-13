import { Quiz } from '../../types/quiz';
import { GeminiClient } from './client';
import { retryConfig } from './config';
import { createFallbackQuiz } from '../../utils/fallback';
import { logger } from '../../utils/logger';
import { validateQuizResponse } from '../../utils/validation';

export class GeminiService {
  private client: GeminiClient;

  constructor(apiKey: string) {
    this.client = new GeminiClient(apiKey);
  }

  private async retryWithBackoff(
    fn: () => Promise<Quiz>,
    attempt = 1
  ): Promise<Quiz> {
    try {
      return await fn();
    } catch (error) {
      const nextAttempt = attempt + 1;
      const delay = Math.min(
        retryConfig.initialDelay * Math.pow(2, attempt - 1),
        retryConfig.maxDelay
      );

      if (nextAttempt <= retryConfig.maxRetries) {
        logger.warn(`Retry attempt ${attempt}/${retryConfig.maxRetries}`, { delay });
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryWithBackoff(fn, nextAttempt);
      }

      throw error;
    }
  }

  async generateQuiz(ageRange: string): Promise<Quiz> {
    try {
      return await this.retryWithBackoff(async () => {
        const response = await this.client.generateQuiz(ageRange);
        return validateQuizResponse(response);
      });
    } catch (error) {
      logger.error('All retry attempts failed', { error, ageRange });
      return createFallbackQuiz(ageRange);
    }
  }
}