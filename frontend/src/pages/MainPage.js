// src/pages/MainPage.js

import React from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Navbar from "../components/Navbar";

function MainPage() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold">Create Event</h2>
        <EventForm />
        <h2 className="mt-8 mb-4 text-2xl font-bold">Your Events</h2>
        <EventList />
      </div>
    </div>
  );
}

export default MainPage;
