import React, { useState, useEffect } from 'react';
// Correct quizData structure: each topic is an array of question objects
const quizData = {
  logical: [
    {
      question: "If all roses are flowers and some flowers fade quickly, which statement must be true?",
      options: [
        "All roses fade quickly",
        "Some roses may fade quickly",
        "No roses fade quickly",
        "Roses never fade"
      ],
      correctAnswer: "Some roses may fade quickly"
    },
    {
      question: "All doctors wear white coats. John is wearing a white coat. Therefore:",
      options: [
        "John is definitely a doctor",
        "John might be a doctor",
        "John is not a doctor",
        "John is a nurse"
      ],
      correctAnswer: "John might be a doctor"
    },
    {
      question: "If A = 1, B = 2, C = 3, then what does CAB equal?",
      options: [
        "123",
        "312",
        "321",
        "213"
      ],
      correctAnswer: "321"
    }
  ],
  verbal: [
    {
      question: "Choose the word that best completes the analogy: Book is to Reading as Fork is to ___",
      options: ["Writing", "Eating", "Cooking", "Cutting"],
      correctAnswer: "Eating"
    },
    {
      question: "Select the word that means the opposite of 'Benevolent':",
      options: ["Kind", "Generous", "Malevolent", "Charitable"],
      correctAnswer: "Malevolent"
    },
    {
      question: "Complete the analogy: Light is to Dark as Day is to ___",
      options: ["Sun", "Night", "Morning", "Evening"],
      correctAnswer: "Night"
    }
  ],
  numbers: [
    {
      question: "What comes next in the sequence: 2, 4, 8, 16, __?",
      options: ["20", "24", "32", "64"],
      correctAnswer: "32"
    },
    {
      question: "If 3 workers can complete a task in 6 days, how many days will it take 2 workers?",
      options: ["4 days", "6 days", "9 days", "12 days"],
      correctAnswer: "9 days"
    },
    {
      question: "What is 25% of 80?",
      options: ["15", "20", "25", "30"],
      correctAnswer: "20"
    }
  ],
  clock: [
    {
      question: "If the time is 3:45, what is the angle between the hour and minute hands?",
      options: ["82.5 degrees", "90 degrees", "97.5 degrees", "105 degrees"],
      correctAnswer: "97.5 degrees"
    },
    {
      question: "At what time between 2 and 3 o'clock will the hands of the clock be at right angles?",
      options: ["2:27", "2:30", "2:33", "2:36"],
      correctAnswer: "2:27"
    },
    {
      question: "How many times do the hour and minute hands overlap in 12 hours?",
      options: ["10 times", "11 times", "12 times", "13 times"],
      correctAnswer: "11 times"
    }
  ]
};
import QuizInterface from './QuizInterface';

const fetchAIQuestion = async (topic, difficulty = 'medium') => {
  try {
    const response = await fetch('http://localhost:3000/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, difficulty }),
    });
    if (!response.ok) throw new Error('Failed to fetch AI question');
    return await response.json();
  } catch (error) {
    alert('AI quiz generation failed. Using fallback question.');
    return null;
  }
};

const AptitudeQuiz = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds per question
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning]);

  const handleTopicSelect = async (selectedTopic) => {
    setTopic(selectedTopic);
    setShowResult(false);
    setScore(0);
    setSelectedAnswer('');
    setShowSolution(false);
    setTimer(60);
    setIsTimerRunning(true);

    // Try to fetch AI questions first
    const aiQuestions = [];
    try {
      for (let i = 0; i < 5; i++) {
        const q = await fetchAIQuestion(selectedTopic, 'medium');
        if (q) aiQuestions.push(q);
      }
    } catch (error) {
      console.log('AI questions failed, using fallback questions');
    }

    // If AI questions failed or returned empty, use fallback questions
    if (aiQuestions.length === 0) {
      // Use the hardcoded questions from quizData
      const fallbackQuestions = quizData[selectedTopic] || quizData.logical;
      setQuestions(fallbackQuestions);
    } else {
      setQuestions(aiQuestions);
    }
    setCurrentQuestion(0);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowSolution(false);
      setTimer(60);
    } else {
      setShowResult(true);
      setIsTimerRunning(false);
    }
  };

  const handleRestart = () => {
    setTopic('');
    setCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
    setSelectedAnswer('');
    setShowSolution(false);
    setTimer(60);
    setIsTimerRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Aptitude Quiz</h1>
      
      {!topic && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <h2 className="text-2xl font-bold col-span-2 mb-4">Select Topic</h2>
          {Object.keys(quizData).map((topicName) => (
            <button
              key={topicName}
              onClick={() => handleTopicSelect(topicName)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg capitalize hover:bg-blue-600 transition-colors duration-200"
            >
              {topicName.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}

      {topic && !showResult && questions.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold capitalize">{topic} Quiz</h2>
            <div className="text-lg font-semibold">
              Time left: <span className={`${timer <= 10 ? 'text-red-500' : 'text-blue-500'}`}>{timer}s</span>
            </div>
          </div>

          <QuizInterface
            currentQuestion={currentQuestion}
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            showSolution={showSolution}
            onAnswerSelect={handleAnswerSelect}
            onShowSolution={() => setShowSolution(!showSolution)}
            onNext={handleNext}
            totalQuestions={questions.length}
          />
        </div>
      )}

      {showResult && (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-4">
            Your score: <span className="font-bold text-blue-500">{score}</span> out of {questions.length}
          </p>
          <p className="mb-6">
            Percentage: <span className="font-bold text-green-500">{((score / questions.length) * 100).toFixed(1)}%</span>
          </p>
          <button
            onClick={handleRestart}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try Another Topic
          </button>
        </div>
      )}
    </div>
  );
};

export default AptitudeQuiz;