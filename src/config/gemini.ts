/**
 * Gemini AI Configuration
 */
export const geminiConfig = {
  // Model configuration
  model: {
    name: "gemini-exp-1206",
    generationConfig: {
      temperature: 0.85,        // Controls randomness (0-1)
      topP: 0.95,           // Nucleus sampling parameter
      topK: 64,             // Top-k sampling parameter
      maxOutputTokens: 8192, // Maximum length of generated text
      responseMimeType: "text/plain"
    }
  },
  
  // Safety settings (if needed)
  safetySettings: {
    // Add any safety thresholds here
  }
};

/**
 * Validates the Gemini API key
 */
export function validateApiKey(apiKey: string | undefined): apiKey is string {
  if (!apiKey) {
    throw new Error('Gemini API key is required. Please set VITE_GEMINI_API_KEY in your environment.');
  }
  return true;
}