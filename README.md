# Tasks

A simple task manager built with React, React Router, and MUI. Organize your to-dos into
collections (like School, Personal, Design), track daily due items on a dashboard, and manage
your account — all running entirely in the browser with no backend. Everything is saved to
`localStorage`, so your data stays on your device between visits.

## Features

- Sign up / sign in (stored locally, no real backend)
- Collections of tasks with colors and icons
- Daily overview of what's due today, plus basic stats
- Add, complete, and delete tasks
- Editable account profile (name, email, password, avatar, plan)

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app in development mode:

   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

That's it — sign up with any name/email/password to get started.

## Other commands

| Command           | What it does                                  |
| ------------------ | ---------------------------------------------- |
| `npm run build`   | Builds a production-ready version into `dist/` |
| `npm run preview` | Serves the production build locally to test it |
| `npm run lint`    | Checks the code for lint errors                |

## Resetting your data

Since everything is stored in the browser's `localStorage`, you can start fresh at any time by
clearing your browser's site data for this app, or by running this in the browser console:

```js
localStorage.clear()
```
