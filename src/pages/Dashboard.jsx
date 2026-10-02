import "./Dashboard.css";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [dueTopics, setDueTopics] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("history");
    const parsedData = JSON.parse(savedData) || [];
    setHistory(parsedData);

    const today = new Date().toISOString().split("T")[0];

    // Streak calculation
    const allDates = parsedData.map((entry) => entry.date);
    const uniqueDates = [...new Set(allDates)];
    const sortedDates = uniqueDates
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

    const mostRecentDate =
      sortedDates.length > 0
        ? sortedDates[0].toISOString().split("T")[0]
        : null;

    let streakCount = 0;
    if (mostRecentDate === today) {
      streakCount = 1;
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInDays = (sortedDates[i] - sortedDates[i + 1]) / oneDay;
        if (diffInDays === 1) {
          streakCount++;
        } else {
          break;
        }
      }
    }
    setStreak(streakCount);

    // Review Due calculation
    const savedReviewList =
      JSON.parse(localStorage.getItem("reviewList")) || [];
    setReviewList(savedReviewList);
    const due = savedReviewList.filter((item) => item.reviewDate <= today);
    setDueTopics(due);
  }, []);

  return (
    <div  className="dashboard-container">
    
        <h1 className="page--heading">Your Progress</h1>
        <p className="Page-subtitle">Track your quiz history, streak, and upcoming reviews.</p>
     
      <p className="streak-card" > Streak: {streak}🔥</p>
      {history.length === 0 ? (
        <p className="status-msg">No quiz attempt yet, Go to the quiz page.</p>
      ) : (
        <div className="dashboard-grid">
        
          <div className="dashboard-section">
        <h3 className="section-title">Quiz History</h3>
        {history.map((details, index) => (
         <div className="history-item" key={index}>
  <p><span className="item-label">Topic:</span> {details.topic}</p>
  <p><span className="item-label">Score:</span> {details.score} / {details.total}</p>
  <p><span className="item-label">Attempted on:</span> {details.date}</p>
</div>
        ))}
      </div>

          <div className="dashboard-section">
            <h3 className="section-title">Upcoming Reviews</h3>
            {reviewList.length > 0 ? (
              reviewList.map((item, index) => (
               <p key={index} className="review-item">
  📌 <span className="item-label">Topic:</span> {item.topic} <br /> <span className="item-label">Next review:</span> {item.reviewDate}
</p>
              ))
            ) : (
              <p className="status-msg">All caught up! No reviews due today.</p>
            )}
          </div>
          
        </div>
      
      )}
      
    </div>
    
  );
};
