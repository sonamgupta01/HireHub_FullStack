import React from 'react';

const QuizInterface = ({
  currentQuestion,
  question,
  selectedAnswer,
  showSolution,
  onAnswerSelect,
  onShowSolution,
  onNext,
  totalQuestions
}) => {
  return (
    <div className="mb-6">
      <p className="text-lg mb-4">Question {currentQuestion + 1} of {totalQuestions}</p>
      <p className="text-xl mb-4">{question.question}</p>
      
      <div className="space-y-3 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-lg transition-all duration-200 flex items-center gap-3 
              ${selectedAnswer === option 
                ? 'bg-blue-500 text-white transform scale-102 shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 hover:transform hover:scale-101'}`}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-opacity-20 
              ${selectedAnswer === option ? 'bg-white' : 'bg-gray-300'}">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1">{option}</span>
            {selectedAnswer === option && (
              <span className="text-white">✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onShowSolution}
          className={`px-5 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2
            ${showSolution ? 'bg-gray-600' : 'bg-gray-500'} text-white hover:bg-gray-600`}
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
        
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2
            ${selectedAnswer 
              ? 'bg-green-500 hover:bg-green-600 transform hover:scale-102' 
              : 'bg-gray-300 cursor-not-allowed'} text-white`}
        >
          Next
          <span className="ml-1">→</span>
        </button>
      </div>

      {showSolution && (
        <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-100 animate-fade-in">
          <h3 className="font-bold text-blue-900 mb-2">Solution</h3>
          <p className="text-blue-800">
            {question.solution || `The correct answer is: ${question.correctAnswer}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;