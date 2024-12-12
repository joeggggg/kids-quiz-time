import { Quiz } from '../types/quiz';

export const quizData: Quiz = {
  quizId: "Q1004",
  testerAge: "from 4 to 6",
  questionQty: 10,
  quizType: "CHOICES",
  questions: [
    {
      id: 1,
      question: "What do we call a shape that has four equal sides and four corners?",
      choice: ["Circle", "Square", "Triangle", "Hexagon"],
      answer: "Square",
      category: "Mathematics"
    },
    {
      id: 2,
      question: "Which of these things can you see in the sky during the day?",
      choice: ["Stars", "The Sun", "Moon", "Fireworks"],
      answer: "The Sun",
      category: "Science"
    },
    {
      id: 3,
      question: "What do you use to cut paper into different shapes?",
      choice: ["Scissors", "Hammer", "Saw", "Screwdriver"],
      answer: "Scissors",
      category: "Technology"
    },
    {
      id: 4,
      question: "If you mix yellow and blue paint, what color do you make?",
      choice: ["Red", "Green", "Orange", "Purple"],
      answer: "Green",
      category: "Arts"
    },
    {
      id: 5,
      question: "What kind of simple machine helps us lift heavy objects?",
      choice: ["Slide", "Lever", "Swing", "Stairs"],
      answer: "Lever",
      category: "Engineering"
    }
  ]
};