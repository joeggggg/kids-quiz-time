import { GoogleGenerativeAI } from '@google/generative-ai';
import { Quiz } from '../types/quiz';
import { quizData } from '../data/questions';
import { QUIZ_PROMPT } from '../utils/constants';

// Get API key from environment variables
const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

/**
 * Generates a quiz using Gemini AI based on the specified age range
 * @param ageRange - The target age range for the quiz
 * @returns Promise<Quiz> - The generated quiz object
 */
export async function generateQuiz(ageRange: string): Promise<Quiz> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent([
      { text: QUIZ_PROMPT },
      { text: `The quiz should be appropriate for children aged ${ageRange}.` }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsedQuiz = JSON.parse(text);
      
      if (!isValidQuiz(parsedQuiz)) {
        console.error('Invalid quiz structure received from API');
        return createFallbackQuiz(ageRange);
      }
      
      return parsedQuiz;
    } catch (parseError) {
      console.error('Failed to parse quiz JSON:', parseError);
      return createFallbackQuiz(ageRange);
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    return createFallbackQuiz(ageRange);
  }
}

/**
 * Validates the structure of a quiz object
 * @param quiz - The quiz object to validate
 * @returns boolean - Whether the quiz object is valid
 */
function isValidQuiz(quiz: any): quiz is Quiz {
  return (
    quiz &&
    typeof quiz.quizId === 'string' &&
    typeof quiz.testerAge === 'string' &&
    typeof quiz.questionQty === 'number' &&
    Array.isArray(quiz.questions) &&
    quiz.questions.every((q: any) =>
      typeof q.id === 'number' &&
      typeof q.question === 'string' &&
      Array.isArray(q.choice) &&
      q.choice.length >= 2 &&
      typeof q.answer === 'string' &&
      typeof q.category === 'string'
    )
  );
}

/**
 * Creates a fallback quiz when AI generation fails
 * @param ageRange - The target age range for the quiz
 * @returns Quiz - A fallback quiz object
 */
function createFallbackQuiz(ageRange: string): Quiz {
  return {
    ...quizData,
    testerAge: ageRange,
    quizId: `Q${Date.now()}`,
  };
}