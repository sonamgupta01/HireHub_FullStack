// Track user performance
export const userPerformance = {
  totalQuestions: 0,
  correctAnswers: 0,
  topicScores: {},
  lastDifficultyAdjustment: Date.now()
};

// Generate questions using fallback logic only (no AI in frontend)
export const generateQuestion = async (topic, difficulty) => {
  return getFallbackQuestion(topic);
};

// Adjust difficulty based on performance
export const adjustDifficulty = (performance) => {
  const successRate = performance.correctAnswers / performance.totalQuestions;
  if (successRate > 0.8) return 'hard';
  if (successRate < 0.4) return 'easy';
  return 'medium';
};

// Generate personalized feedback using fallback logic only
export const generateFeedback = async (topicScore, topic) => {
  const successRate = topicScore.correct / topicScore.total;
  return getFallbackFeedback(successRate);
};

// Fallback questions in case AI generation fails
const getFallbackQuestion = (topic) => {
  const fallbackQuestions = {
    logical: {
      question: "If all roses are flowers and some flowers fade quickly, which statement must be true?",
      options: [
        "All roses fade quickly",
        "Some roses may fade quickly",
        "No roses fade quickly",
        "Roses never fade"
      ],
      correctAnswer: "Some roses may fade quickly"
    },
    verbal: {
      question: "Choose the word that best completes the analogy: Book is to Reading as Fork is to ___",
      options: ["Writing", "Eating", "Cooking", "Cutting"],
      correctAnswer: "Eating"
    },
    numbers: {
      question: "What comes next in the sequence: 2, 4, 8, 16, __?",
      options: ["20", "24", "32", "64"],
      correctAnswer: "32"
    },
    clock: {
      question: "If the time is 3:45, what is the angle between the hour and minute hands?",
      options: ["82.5 degrees", "90 degrees", "97.5 degrees", "105 degrees"],
      correctAnswer: "97.5 degrees"
    }
  };
  return fallbackQuestions[topic] || fallbackQuestions.logical;
};

// Fallback feedback in case AI generation fails
const getFallbackFeedback = (successRate) => {
  if (successRate >= 0.8) {
    return "Excellent work! You're showing great understanding of the concepts.";
  } else if (successRate >= 0.6) {
    return "Good progress! Keep practicing to improve further.";
  } else if (successRate >= 0.4) {
    return "You're on the right track. Focus on understanding the questions carefully.";
  } else {
    return "Don't worry! Practice makes perfect. Try reviewing the basics and try again.";
  }
};