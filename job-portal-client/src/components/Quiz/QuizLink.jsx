import React, { useState } from 'react';
import AIQuiz from './AIQuiz';

const QuizLink = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowQuiz(!showQuiz)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {showQuiz ? 'Close AI Quiz' : 'Take AI Quiz'}
      </button>

      {showQuiz && (
        <div className="mt-4">
          <AIQuiz />
        </div>
      )}
    </div>
  );
};

export default QuizLink;