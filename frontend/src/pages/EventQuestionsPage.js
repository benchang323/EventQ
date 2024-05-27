// src/pages/EventQuestionsPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventQuestionsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/events/${eventId}/questions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setPolling(false); 
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await fetch(`/events/${eventId}/feedback`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        setPolling(false);
      }
    };

    // Polling mechanism
    const intervalId = setInterval(() => {
      if (polling) {
        fetchQuestions();
        fetchFeedback();
      }
    }, 5000); 

    fetchQuestions();
    fetchFeedback();

    return () => {
      clearInterval(intervalId);
      setPolling(false);
    };
  }, [eventId, polling]);

  const handleBackClick = () => {
    navigate("/main");
  };

  return (
    <div className="page-container">
      <button
        onClick={handleBackClick}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Back to Main
      </button>
      <h2>Questions for Event ID: {eventId}</h2>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={question._id} className="p-4 mb-2 border rounded">
            <p>
              <strong>
                {index + 1}. {question.text}
              </strong>{" "}
              (Upvotes: {question.upvotes})
            </p>
          </div>
        ))
      ) : (
        <p>No questions found for this event.</p>
      )}

      <h2>Feedback for Event ID: {eventId}</h2>
      {feedback.length > 0 ? (
        feedback.map((fb, index) => (
          <div key={fb._id} className="p-4 mb-2 border rounded">
            <p>
              {index + 1}. {fb.feedback}
            </p>
          </div>
        ))
      ) : (
        <p>No feedback found for this event.</p>
      )}
    </div>
  );
};

export default EventQuestionsPage;
