import "./Quiz.css";
import { useState , useRef } from "react";
export const Quiz = () => {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [quizTopic, setQuizTopic] = useState("");
const textareaRef = useRef(null);

const handleInputChange = (e) => {
  setInput(e.target.value);

  const textarea = textareaRef.current;
  textarea.style.height = "auto";

  if (textarea.scrollHeight > 500) {
    textarea.style.height = "500px";
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  }
};

  async function generateQuiz() {
    setLoading(true);
    setError(null);

    const prompt = `You are a quiz generator. Based on the following topic or notes, create at least 15 multiple-choice questions. Also generate a short, clear topic name (2-5 words) summarizing what this quiz is about — this is especially important if the input is long notes rather than a simple topic name.

Respond ONLY with a valid JSON object in this exact format, no extra text, no markdown:
{
  "topic": "Short Topic Name Here",
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "..."
    }
  ]
}

Topic/Notes: ${input}`;

    try {
     const response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});

      const data = await response.json();
      const result = data.candidates[0].content.parts[0].text;
      const parsedQuiz = JSON.parse(result);
      setQuestions(parsedQuiz.questions);
      setQuizTopic(parsedQuiz.topic);
      setInput("");
    } catch (err) {
      setError("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    if (!selectedAns) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setIsAnswered(true);
      if (questions[currentIndex].correctAnswer === selectedAns) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 === questions.length) {
      const newEntry = {
        topic: quizTopic,
        score: score,
        total: questions.length,
        date: new Date().toISOString().split("T")[0],
      };

      const oldHistory = JSON.parse(localStorage.getItem("history")) || [];
      const updatedHistory = [...oldHistory, newEntry];
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    }

    setCurrentIndex(currentIndex + 1);
    setSelectedAns(null);
    setIsAnswered(false);
  };

  const getReviewInfo = (feedback) => {
    const today = new Date();
    let days;
    switch (feedback) {
      case "hard":
        days = 1;
        break;
      case "medium":
        days = 3;
        break;
      case "easy":
        days = 7;
        break;

      default:
        days = 0;
        break;
    }
    today.setDate(today.getDate() + days);
    const reviewDate = today.toISOString().split("T")[0];
    return { days, reviewDate };
  };

  const reviewInfo = feedback ? getReviewInfo(feedback) : null;

  const saveReviewDate = (topic, reviewDate) => {
    const savedList = JSON.parse(localStorage.getItem("reviewList")) || [];

    const existingIndex = savedList.findIndex(
      (item) => item.topic.toLowerCase() === topic.toLowerCase(),
    );

    if (existingIndex !== -1) {
      savedList[existingIndex].reviewDate = reviewDate;
    } else {
      savedList.push({ topic, reviewDate });
    }

    localStorage.setItem("reviewList", JSON.stringify(savedList));
  };

  return (
    <div className="quiz-container">
      <div>
        <h1 className="page-heading">Ready to test yourself?</h1>
        <p className="page--subtitle">
          Paste your notes, or type a topic name — I'll generate quiz questions
          from it.
        </p>
      </div>

      {questions.length > 0 && (
        <div className="quiz-card">
          {currentIndex < questions.length ? (
            <div>
              <p className="question-text">
                <strong>Q{currentIndex + 1}:</strong>{" "}
                {questions[currentIndex].question}
              </p>

              {questions[currentIndex].options.map((option, i) => (
                <div className="option-row" key={i}>
                  <label className="option-label">
                    <input
                      type="radio"
                      name="quizOption"
                      value={option}
                      checked={selectedAns === option}
                      onChange={() => setSelectedAns(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}

              {showWarning && (
                <p className="error-msg">Please choose an option.</p>
              )}

              {!isAnswered ? (
                <div>
                  <button className="primary--btn" onClick={handleSubmit}>
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div>
                  <button className="primary--btn" onClick={handleNext}>
                    Next Question
                  </button>
                  <p className="feedback-text">
                    {selectedAns == questions[currentIndex].correctAnswer
                      ? "✅ Correct!"
                      : "❌ Wrong!"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-finished">
              {!feedback ? (
                <>
                  <h2>Quiz Finished! 🎉</h2>
                  <p className="score-text">
                    Your Score: {score} / {questions.length}
                  </p>
                  <div className="rating-buttons">
                    <p className="feedback-question">
                      How was this quiz for you?
                    </p>
                    <button
                      className="rating-btn"
                      onClick={() => {
                        setFeedback("hard");
                        const info = getReviewInfo("hard");
                        saveReviewDate(quizTopic, info.reviewDate);
                      }}
                    >
                      😰 Hard
                    </button>
                    <button
                      className="rating-btn"
                      onClick={() => {
                        setFeedback("medium");
                        const info = getReviewInfo("medium");
                        saveReviewDate(quizTopic, info.reviewDate);
                      }}
                    >
                      🥲 Medium
                    </button>
                    <button
                      className="rating-btn"
                      onClick={() => setFeedback("easy")}
                    >
                      😎 Easy
                    </button>
                  </div>
                </>
              ) : feedback === "easy" ? (
                <p className="feedback-text-final">
                  Great job! Now you should focus on other topics.
                </p>
              ) : (
                <p className="feedback-text-final">
                  {feedback === "hard" && "That was hard? No worries — "}
                  {feedback === "medium" && "A bit tricky? "}
                  Try this again on {reviewInfo.reviewDate}!
                </p>
              )}
            </div>
          )}
        </div>
      )}
      <div className="input-section">
        <textarea
  ref={textareaRef}
  className="input--box"
  value={input}
  onChange={handleInputChange}
  placeholder="Write your topics for quick Quiz."
></textarea>

        <button
          className="primary-btn"
          onClick={generateQuiz}
          disabled={loading}
        >
          {loading ? <span className="spinner"></span> : "Generate Quiz"}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};
