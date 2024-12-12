/**
 * Tracks quiz completion events
 * @param quizId - The ID of the completed quiz
 * @param ageRange - The age range of the quiz
 * @param score - The user's score
 */
export const trackQuizCompletion = (quizId: string, ageRange: string, score: number) => {
  // Implementation for analytics tracking
  console.log('Quiz completed:', { quizId, ageRange, score });
};