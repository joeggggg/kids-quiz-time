import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export interface SafetySetting {
  category: HarmCategory;
  threshold: HarmBlockThreshold;
}

export interface GenerationConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  responseMimeType: string;
}

export interface ModelConfig {
  name: string;
  generationConfig: GenerationConfig;
  safetySettings: SafetySetting[];
}