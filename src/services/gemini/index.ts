import { GeminiService } from './service';
import { Quiz } from '../../types/quiz';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const geminiService = new GeminiService(apiKey);

export async function generateQuiz(ageRange: string): Promise<Quiz> {
  return geminiService.generateQuiz(ageRange);
}

export * from './types';