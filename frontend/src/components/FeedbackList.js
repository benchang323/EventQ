import React, { useEffect, useState } from 'react';

const FeedbackList = ({ eventId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/events/${eventId}/feedback`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedbacks(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchFeedback, 5000);

    return () => clearInterval(interval);
  }, [eventId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {feedbacks.length > 0 ? feedbacks.map((fb, index) => (
        <div key={index} className="card">
          <p>{fb.feedback}</p>
        </div>
      )) : <p>No feedback yet.</p>}
    </div>
  );
};

export default FeedbackList;
