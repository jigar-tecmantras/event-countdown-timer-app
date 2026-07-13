const pad = (value) => value.toString().padStart(2, '0');

const durationParts = (difference) => {
  const totalSeconds = Math.max(0, Math.floor(difference / 1000));
  const days = Math.floor(totalSeconds / 86400);
  let remainder = totalSeconds % 86400;
  const hours = Math.floor(remainder / 3600);
  remainder %= 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder % 60;

  return { days, hours, minutes, seconds };
};

const EventCountdownCard = ({ event, now, onRemove }) => {
  const target = new Date(event.targetDate);
  const difference = target - now;
  const isExpired = difference <= 0;
  const { days, hours, minutes, seconds } = durationParts(difference);

  return (
    <article className={`countdown-card ${isExpired ? 'countdown-card--expired' : ''}`}>
      <div>
        <h3>{event.title}</h3>
        <p className="countdown-card__date">Target: {target.toLocaleString()}</p>
      </div>

      <div className="countdown-card__timer">
        {isExpired ? (
          <span className="countdown-card__expired-text">Event expired</span>
        ) : (
          <div className="timer-grid">
            <div>
              <strong>{pad(days)}</strong>
              <span>Days</span>
            </div>
            <div>
              <strong>{pad(hours)}</strong>
              <span>Hours</span>
            </div>
            <div>
              <strong>{pad(minutes)}</strong>
              <span>Minutes</span>
            </div>
            <div>
              <strong>{pad(seconds)}</strong>
              <span>Seconds</span>
            </div>
          </div>
        )}
      </div>

      <button className="text-button" onClick={onRemove}>
        Remove
      </button>
    </article>
  );
};

export default EventCountdownCard;
