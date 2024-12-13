import { GoogleGenerativeAI } from '@google/generative-ai';
import { modelConfig, systemPrompt } from './config';
import { logger } from '../../utils/logger';
import { validateApiKey } from '../../utils/validation';

export class GeminiClient {
  private client: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    validateApiKey(apiKey);
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({
      model: modelConfig.name,
      generationConfig: modelConfig.generationConfig,
      safetySettings: modelConfig.safetySettings,
    });
  }

  async generateQuiz(ageRange: string): Promise<string> {
    try {
      logger.info('Generating quiz', { ageRange });

      const chatSession = this.model.startChat({
        generationConfig: modelConfig.generationConfig,
      });

      const result = await chatSession.sendMessage([
        { text: systemPrompt },
        { text: `The quiz should be appropriate for children aged ${ageRange}.` }
      ]);

      return result.response.text();
    } catch (error) {
      logger.error('Failed to generate quiz', { error, ageRange });
      throw error;
    }
  }
}