# Event Countdown Timer

A Create React App-based dashboard that lets you add multiple events with individual titles and deadlines, and watches the remaining days, hours, minutes, and seconds for each in real time.

## Development

```bash
npm install
npm start
```

The `npm start` command launches a development server on port 3000 by default.

## Production build

```bash
npm run build
```

Additional improvements include persisting events to `localStorage` so they survive reloads, clearing expired events, and keeping the UI keyboard-accessible.
