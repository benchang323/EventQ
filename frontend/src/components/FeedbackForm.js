// src/components/FeedbackForm.js
import React, { useState } from "react";

const FeedbackForm = ({ eventId }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/events/${eventId}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    });
    setFeedback("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="textarea-field"
          required
        ></textarea>
        <button type="submit" className="button-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
