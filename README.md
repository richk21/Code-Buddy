# CodeBuddy Frontend

This is the **frontend** for **CodeBuddy**, a platform to connect developers, track tasks, and achieve weekly coding goals together. Built with **React (TypeScript)**, **MUI**, and **Vite**. This is a minimal project meant for dev.to weekly challenge. Code would be refined and updated in every release.

---

## Features

- User authentication and JWT-based authorization
- Assign and complete tasks with proof submission
- Weekly progress tracking (hours spent vs goal)
- Connect with coding buddies based on skill level and focus area
- Dashboard with points, task stats, and weekly goal visualization
- Responsive and modern UI using MUI + Tailwind

---

## Tech Stack

- **React 18 + TypeScript**
- **Vite** for fast development
- **MUI** for UI components
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router DOM** for routing

---

## 📝 Setup

1. Clone the repository:

```bash
git clone <frontend-repo-url>
cd codebuddy-frontend
```

2. Install dependencies:

````bash
yarn

3. Create a `.env` file at the root:

```env
VITE_BACKEND_URL=http://localhost:5000
````

4. Start the development server:

```bash
yarn dev

The app should be running at `http://localhost:5173` (default Vite port).

---

## 📁 Folder Structure

```

src/
├─ components/ # Reusable UI components
├─ api/ # React pages (Home, Dashboard, Profile, etc.)
├─ api/ # contains all api interfaces
├─ App.tsx # Main app component
├─ main.tsx # Entry point

```

---

## 🔗 Environment Variables

| Name               | Description                 |
| ------------------ | --------------------------- |
| `VITE_BACKEND_URL` | Base URL of the backend API |

---

## 📦 Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `yarn dev`     | Start dev server         |
| `yarn build`   | Build production bundle  |

---

## 📄 Notes

- Make sure the **backend server** is running before starting the frontend.
- Use JWT token for authenticated API calls.
- All tasks and user data are handled via the backend API.
```
