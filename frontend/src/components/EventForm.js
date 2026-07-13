import { useState } from 'react';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

const EventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter an event title.');
      return;
    }

    if (!targetDate) {
      setError('Please choose a future date and time.');
      return;
    }

    const parsed = new Date(targetDate);
    if (Number.isNaN(parsed.getTime())) {
      setError('Invalid date format.');
      return;
    }

    if (parsed <= new Date()) {
      setError('Choose a date/time that is still to come.');
      return;
    }

    onAddEvent({
      id: createId(),
      title: trimmed,
      targetDate: parsed.toISOString(),
    });

    setTitle('');
    setTargetDate('');
    setError('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <label className="input-label">
        <span>Event title</span>
        <input
          type="text"
          placeholder="e.g. Anniversary, Product launch"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={80}
          required
        />
      </label>

      <label className="input-label">
        <span>Target date &amp; time</span>
        <input
          type="datetime-local"
          value={targetDate}
          onChange={(event) => setTargetDate(event.target.value)}
          required
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Add event</button>
    </form>
  );
};

export default EventForm;
