import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import JoinEventPage from "./pages/JoinEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import { EventsProvider } from "./contexts/EventContext";
import EventQuestionsPage from "./pages/EventQuestionsPage";
import { QuestionsProvider } from "./contexts/QuestionsContext";

function App() {
  return (
    <BrowserRouter>
      <EventsProvider>
        <QuestionsProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<LandingPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/join" element={<JoinEventPage />} />
            <Route path="/event/:eventId" element={<EventDetailsPage />} />
            <Route
              path="/event-questions/:eventId"
              element={<EventQuestionsPage />}
            />
          </Routes>
        </QuestionsProvider>
      </EventsProvider>
    </BrowserRouter>
  );
}

export default App;
