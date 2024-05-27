// src/pages/EventDetailsPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) return <div>Loading event details...</div>;

  return (
    <div className="page-container">
      <QuestionForm eventId={eventId} />
      <FeedbackForm eventId={eventId} />
      <h2>QUESTIONS</h2>
      <QuestionList eventId={eventId} />
      <h2>FEEDBACK</h2>
      <FeedbackList eventId={eventId} />
    </div>
  );
};

export default EventDetailsPage;
