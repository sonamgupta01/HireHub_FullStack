import React from 'react';
import { Link } from 'react-router-dom';

const QuizLink = () => {
  return (
    <li>
      <Link
        to="/ai-quiz"
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <span className="text-gray-500">🤖</span>
        AI Quiz
      </Link>
    </li>
  );
};

export default QuizLink;