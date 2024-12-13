import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

/**
 * Gemini AI Configuration
 */
export const geminiConfig = {
  // Model configuration
  model: {
    name: "gemini-2.0-flash-exp",
    systemInstruction: "you are the master of quiz creator for kid to learn STEAM",
    generationConfig: {
      temperature: 0.8,      // Controls creativity vs consistency
      topP: 0.95,           // Nucleus sampling parameter
      topK: 40,             // Top-k sampling parameter
      maxOutputTokens: 8192, // Maximum response length
      responseMimeType: "text/plain"
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  }
};

/**
 * Retry configuration for API calls
 */
export const retryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 5000
};