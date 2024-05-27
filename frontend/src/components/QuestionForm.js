// src/components/QuestionForm.js
import React, { useState } from "react";

const QuestionForm = ({ eventId }) => {
  const [questionText, setQuestionText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/events/${eventId}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: questionText }),
    });
    setQuestionText("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask a question..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="textarea-field"
          required
        ></textarea>
        <button type="submit" className="button-primary">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
