import { GoogleGenerativeAI } from '@google/generative-ai';
import { Quiz } from '../types/quiz';
import { quizData } from '../data/questions';
import { QUIZ_PROMPT } from '../utils/constants';
import { validateQuizStructure } from '../utils/validation';
import { createFallbackQuiz } from '../utils/fallback';
import { logger } from '../utils/logger';
import { geminiConfig, validateApiKey } from '../config/gemini';

// Get and validate API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
validateApiKey(apiKey);

// Initialize Gemini AI with configuration
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Generates a quiz using Gemini AI based on the specified age range
 */
export async function generateQuiz(ageRange: string): Promise<Quiz> {
  const model = genAI.getGenerativeModel({
    model: geminiConfig.model.name,
    generationConfig: geminiConfig.model.generationConfig
  });

  try {
    logger.info('Generating quiz for', { ageRange });
    
    const result = await model.generateContent([
      { text: QUIZ_PROMPT },
      { text: `The quiz should be appropriate for children aged ${ageRange}.` }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsedQuiz = JSON.parse(text);
      
      if (!validateQuizStructure(parsedQuiz)) {
        logger.error('Invalid quiz structure received from API', { quiz: parsedQuiz });
        return createFallbackQuiz(ageRange);
      }
      
      logger.info('Quiz generated successfully');
      return parsedQuiz;
      
    } catch (parseError) {
      logger.error('Failed to parse quiz JSON', { error: parseError, text });
      return createFallbackQuiz(ageRange);
    }
  } catch (error) {
    logger.error('Error generating quiz', { error, ageRange });
    return createFallbackQuiz(ageRange);
  }
}

/**
 * Handles retrying quiz generation with exponential backoff
 */
export async function retryQuizGeneration(
  ageRange: string, 
  maxRetries = 3,
  initialDelay = 1000
): Promise<Quiz> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await generateQuiz(ageRange);
    } catch (error) {
      const delay = initialDelay * Math.pow(2, attempt);
      logger.warn(`Retry attempt ${attempt + 1}/${maxRetries}`, { delay });
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  return createFallbackQuiz(ageRange);
}