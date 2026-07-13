import { useEffect, useMemo, useState } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const STORAGE_KEY = 'event-countdown-app.events';

function App() {
  const [events, setEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setEvents(parsed);
        }
      } catch (error) {
        console.error('Unable to parse stored events', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const addEvent = (newEvent) => {
    setEvents((previous) => [...previous, newEvent]);
  };

  const removeEvent = (id) => {
    setEvents((previous) => previous.filter((event) => event.id !== id));
  };

  const clearExpired = () => {
    setEvents((previous) =>
      previous.filter((event) => new Date(event.targetDate) > currentTime)
    );
  };

  const sortedEvents = useMemo(() => [...events].sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate)), [events]);
  const expiredCount = sortedEvents.filter((event) => new Date(event.targetDate) <= currentTime).length;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Live countdown dashboard</p>
          <h1>Event Timeline</h1>
          <p className="subhead">
            Add any number of events with titles and deadlines, then watch the remaining days, hours, minutes,
            and seconds update in real time.
          </p>
        </div>
        <div className="metadata">
          <span>Server time: {currentTime.toLocaleString()}</span>
        </div>
      </header>

      <main className="app-main">
        <section className="panel panel--form">
          <h2>Add a new event</h2>
          <EventForm onAddEvent={addEvent} />
        </section>

        <section className="panel panel--list">
          <div className="panel-heading">
            <h2>Events</h2>
            <div className="panel-actions">
              <span className="panel-stats">{events.length} total · {expiredCount} expired</span>
              <button className="text-button" onClick={clearExpired} disabled={!expiredCount}>
                Clear expired
              </button>
            </div>
          </div>
          <EventList events={sortedEvents} now={currentTime} onRemove={removeEvent} />
        </section>
      </main>
    </div>
  );
}

export default App;
