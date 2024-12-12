/**
 * Gemini AI Configuration
 */
export const geminiConfig = {
  model: {
    name: "gemini-pro", // Using the stable model version
    generationConfig: {
      temperature: 0.85,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain"
    }
  }
};

export const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 5000
};