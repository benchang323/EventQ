// src/components/EventList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../contexts/EventContext";

const EventList = () => {
  const { events, fetchEvents } = useEvents();
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/event-questions/${eventId}`);
  };

  const deleteEvent = async (eventId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    fetchEvents(); 
  };

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event._id}
            className="card"
            onClick={() => handleEventClick(event._id)}
          >
            <h3 className="text-lg font-bold cursor-pointer">
              NAME: {event.name}
            </h3>
            <p>
              <strong>Description:</strong> {event.details.description}
            </p>
            <p>
              <strong>Date:</strong> {event.details.date}
            </p>
            <p>
              <strong>Location:</strong> {event.details.location}
            </p>
            <p>
              <strong>Unique Code:</strong> {event.unique_code}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(event._id);
              }}
              className="button-secondary"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No events found. Please create an event.</p>
      )}
    </div>
  );
};

export default EventList;
