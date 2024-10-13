import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchQuizData } from "./../../utils/fetchQuizData";
import { Link } from "react-router-dom";
import { decodeHtmlEntity } from "../../utils/decodeHTMLentity";

const TIMER_DURATION = 60;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = useMemo(() => {
    return questions.length > 0 && currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : null;
  }, [questions, currentQuestionIndex]);

  const shuffleAnswers = useCallback(() => {
    if (!currentQuestion) return [];
    const answers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    return answers.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const getData = useCallback(async () => {
    try {
      const quizData = await fetchQuizData();
      if (Array.isArray(quizData) && quizData.length > 0) {
        setQuestions(quizData);
      } else {
        console.error("Received invalid quiz data", quizData);
      }
    } catch (error) {
      console.error("Failed to fetch quiz data", error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Timer Effect
  useEffect(() => {
    if (timer > 0 && !isFinished) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, isFinished]);

  useEffect(() => {
    if (currentQuestion) {
      setShuffledAnswers(shuffleAnswers());
    }
  }, [currentQuestion, shuffleAnswers]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Hitung skor jika jawabannya benar
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer(null); // Reset pilihan jawaban
    setTimer(TIMER_DURATION); // Reset timer

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // const handlePreviousQuestion = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  //     setSelectedAnswer(null); // Reset pilihan jawaban
  //     setTimer(TIMER_DURATION); // Reset timer
  //   }
  // };

  if (isFinished) {
    return (
      <div className="max-w-[700px] mx-auto py-12 text-center">
        <h2>Quiz Selesai!</h2>
        <p className="mb-12">
          Skor anda: {score} / {questions.length}
        </p>
        <Link to={"/"} className="bg-slate-800 text-white py-2 px-4 rounded">
          Kembali
        </Link>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center mt-12 font-semibold text-xl">Loading...</div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto py-12">
      <h1 className="text-xl font-bold">Quiz</h1>
      {/* Menampilkan nomor soal */}
      <div className="pt-1 pb-2">
        <p>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="question-section">
        <p>
          <span
            dangerouslySetInnerHTML={{
              __html: decodeHtmlEntity(currentQuestion.question),
            }}
          />
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            className={`text-start p-2 rounded ${
              selectedAnswer === answer
                ? "bg-gray-600 text-white"
                : "bg-gray-200"
            }`}
            disabled={!!selectedAnswer} // Disabled setelah jawaban dipilih
          >
            <span
              dangerouslySetInnerHTML={{ __html: decodeHtmlEntity(answer) }}
            />
          </button>
        ))}
      </div>
      <div>
        <p className=" pt-4 pb-2">Time left: {timer}s</p>
        <div>
          {selectedAnswer && (
            <button
              onClick={handleNextQuestion}
              className="bg-slate-800 p-2 rounded text-white"
            >
              Next Question
            </button>
          )}
          {/* <button
              onClick={handlePreviousQuestion}
              className="previous-button"
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button> */}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
