// src/components/EventContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem("token");
    return !!token; 
  }, []);

  const fetchEvents = useCallback(async () => {
    if (!isAuthenticated()) return; 

    const token = localStorage.getItem("token");
    const response = await fetch("/events", {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setEvents(data);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <EventsContext.Provider value={{ events, fetchEvents }}>
      {children}
    </EventsContext.Provider>
  );
};
