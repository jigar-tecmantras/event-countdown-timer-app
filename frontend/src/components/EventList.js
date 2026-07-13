import EventCountdownCard from './EventCountdownCard';

const EventList = ({ events, now, onRemove }) => {
  if (!events.length) {
    return <p className="empty-state">You don\'t have any events yet. Add one above to start a countdown.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCountdownCard key={event.id} event={event} now={now} onRemove={() => onRemove(event.id)} />
      ))}
    </div>
  );
};

export default EventList;
