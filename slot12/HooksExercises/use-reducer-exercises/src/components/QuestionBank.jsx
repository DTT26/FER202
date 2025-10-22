import React, { useEffect, useReducer, useRef } from 'react';
import { Button, Container, Card, ProgressBar } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const initialState = {
  questions: [
    {
      id: 1,
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      answer: 'Canberra',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    {
      id: 3,
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
      answer: 'Pacific Ocean',
    },
  ],
  currentQuestion: 0,
  selectedOption: '',
  score: 0,
  showScore: false,
  feedback: null, // 'correct' | 'incorrect' | null
  timeLeft: 10,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_OPTION':
      return { ...state, selectedOption: action.payload, feedback: null };

    case 'TIME_UP': {
      // treat as incorrect if no selection
      const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
      const nextScore = isCorrect ? state.score + 1 : state.score;
      const nextIndex = state.currentQuestion + 1;
      const finished = nextIndex === state.questions.length;
      return {
        ...state,
        score: nextScore,
        currentQuestion: nextIndex,
        selectedOption: '',
        showScore: finished,
        feedback: isCorrect ? 'correct' : 'incorrect',
        timeLeft: 10,
      };
    }

    case 'NEXT_QUESTION': {
      const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
      const nextScore = isCorrect ? state.score + 1 : state.score;
      const nextIndex = state.currentQuestion + 1;
      const finished = nextIndex === state.questions.length;
      return {
        ...state,
        score: nextScore,
        currentQuestion: nextIndex,
        selectedOption: '',
        showScore: finished,
        feedback: isCorrect ? 'correct' : 'incorrect',
        timeLeft: 10,
      };
    }

    case 'RESTART_QUIZ':
      return { ...initialState, highScore: state.highScore };

    case 'SET_TIME':
      return { ...state, timeLeft: action.payload };

    case 'SET_HIGHSCORE':
      return { ...state, highScore: action.payload };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timeLeft, highScore } = state;
  const timerRef = useRef(null);

  // load high score from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('qr_highscore');
    if (stored) dispatch({ type: 'SET_HIGHSCORE', payload: Number(stored) });
  }, []);

  // timer effect
  useEffect(() => {
    // clear previous
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      dispatch({ type: 'SET_TIME', payload: Math.max(0, timeLeft - 1) });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestion, timeLeft]);

  // when time hits 0
  useEffect(() => {
    if (timeLeft === 0 && !showScore) {
      dispatch({ type: 'TIME_UP' });
    }
  }, [timeLeft, showScore]);

  useEffect(() => {
    if (showScore) {
      // persist high score
      const prev = Number(localStorage.getItem('qr_highscore') || '0');
      if (score > prev) {
        localStorage.setItem('qr_highscore', String(score));
        dispatch({ type: 'SET_HIGHSCORE', payload: score });
      }
    }
  }, [showScore]);

  const handleOptionSelect = (option) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
  };

  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: 'RESTART_QUIZ' });
  };

  const progress = Math.round(((currentQuestion) / questions.length) * 100);

  return (
    <Container className="mt-4">
      <Card className="p-4 mb-3">
        <h3>Question Bank (useReducer)</h3>
        <div className="mb-2">Progress: {Math.min(currentQuestion, questions.length)}/{questions.length}</div>
        <ProgressBar now={progress} className="mb-3" />

        {showScore ? (
          <div className="text-center">
            <h4>Your Score: {score} / {questions.length}</h4>
            <p>High Score: {highScore}</p>
            <Button variant="primary" onClick={handleRestartQuiz}>Restart Quiz</Button>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h5>Question {questions[currentQuestion].id}:</h5>
              <div style={{ fontWeight: 600, color: timeLeft <=5 ? 'red' : 'inherit' }}>Time left: {timeLeft}s</div>
            </div>
            <p>{questions[currentQuestion].question}</p>

            <div className="mt-2">
              {questions[currentQuestion].options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedOption === option ? 'success' : 'outline-secondary'}
                  className="m-1"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="mt-3">
              <Button variant="primary" disabled={!selectedOption} onClick={handleNextQuestion}>
                {currentQuestion === questions.length -1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>

            {feedback === 'correct' && (
              <div className="mt-3 text-success"><FaCheckCircle /> Correct! 🎉</div>
            )}
            {feedback === 'incorrect' && (
              <div className="mt-3 text-danger"><FaTimesCircle /> Incorrect! The correct answer is: <strong>{questions[Math.max(0, currentQuestion-1)].answer}</strong></div>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
