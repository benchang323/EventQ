// src/components/QuestionsContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const QuestionsContext = createContext();

export const useQuestions = () => useContext(QuestionsContext);

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(async (eventId) => {
    const response = await fetch(`/events/${eventId}/questions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setQuestions(data);
  }, []);

  const upvoteQuestion = async (questionId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`/questions/${questionId}/upvote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) throw new Error("Failed to upvote question");
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, fetchQuestions, upvoteQuestion }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
