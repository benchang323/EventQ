// src/pages/JoinEventPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinEventPage = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const navigate = useNavigate();

  const handleJoinEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/events/join/${uniqueCode}`);
      if (!response.ok) throw new Error("Event not found");
      const eventDetails = await response.json();
     
      navigate(`/event/${eventDetails._id}`); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="join-event-page">
        <form onSubmit={handleJoinEvent}>
          <input
            type="text"
            placeholder="Enter Event Code"
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            required
          />
          <button type="submit">Join Event</button>
        </form>
      </div>
    </div>
  );
};

export default JoinEventPage;
