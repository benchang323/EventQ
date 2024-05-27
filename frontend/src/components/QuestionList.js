import React, { useEffect, useState } from "react";
import { useQuestions } from "../contexts/QuestionsContext";

const QuestionList = ({ eventId }) => {
  const { questions, fetchQuestions, upvoteQuestion } = useQuestions();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      fetchQuestions(eventId).finally(() => setIsLoading(false));
    }, 5000); 

    return () => clearInterval(interval);
  }, [eventId, fetchQuestions]);

  const handleUpvote = (questionId) => {
    upvoteQuestion(questionId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question._id} className="card">
            <p>
              {question.text} - Upvotes: {question.upvotes}
            </p>
            <button onClick={() => handleUpvote(question._id)}>Upvote</button>
          </div>
        ))
      ) : (
        <p>No questions found for this event.</p>
      )}
    </div>
  );
};

export default QuestionList;
