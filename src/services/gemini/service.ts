import { Quiz } from '../../types/quiz';
import { GeminiClient } from './client';
import { RETRY_CONFIG } from './config';
import { createFallbackQuiz } from '../../utils/fallback';
import { QUIZ_PROMPT } from '../../utils/constants';
import { logger } from '../../utils/logger';

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
        RETRY_CONFIG.initialDelay * Math.pow(2, attempt - 1),
        RETRY_CONFIG.maxDelay
      );

      if (nextAttempt <= RETRY_CONFIG.maxRetries) {
        logger.warn(`Retry attempt ${attempt}/${RETRY_CONFIG.maxRetries}`, { delay });
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryWithBackoff(fn, nextAttempt);
      }

      throw error;
    }
  }

  async generateQuiz(ageRange: string): Promise<Quiz> {
    try {
      return await this.retryWithBackoff(() => 
        this.client.generateQuiz(QUIZ_PROMPT, ageRange)
      );
    } catch (error) {
      logger.error('All retry attempts failed', { error, ageRange });
      return createFallbackQuiz(ageRange);
    }
  }
}