import { GoogleGenerativeAI } from '@google/generative-ai';
import { geminiConfig } from './config';
import { validateApiKey, validateResponse } from './validation';
import { Quiz } from '../../types/quiz';
import { logger } from '../../utils/logger';

export class GeminiClient {
  private client: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    validateApiKey(apiKey);
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({
      model: geminiConfig.model.name,
      generationConfig: geminiConfig.model.generationConfig
    });
  }

  async generateQuiz(prompt: string, ageRange: string): Promise<Quiz> {
    try {
      logger.info('Generating quiz', { ageRange });

      const result = await this.model.generateContent([
        { text: prompt },
        { text: `The quiz should be appropriate for children aged ${ageRange}.` }
      ]);

      const response = await result.response;
      const text = response.text();

      return validateResponse(text);
    } catch (error) {
      logger.error('Failed to generate quiz', { error, ageRange });
      throw error;
    }
  }
}