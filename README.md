# TaskFlow Frontend

A task management web application built with **React 19** and **Tailwind CSS**, consuming the [TaskFlow API](https://github.com/alexandreoliveira/TaskFlow).

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Pages & Routes](#pages--routes)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Branch History](#branch-history)

---

## Overview

TaskFlow Frontend is a single-page application (SPA) that lets users register, log in, and manage their personal task lists. An admin role unlocks access to the user management panel. Authentication state is held in React Context, with the JWT decoded client-side to extract the user's name and role.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| React Router | 7 | Client-side routing |
| Tailwind CSS | 3 | Utility-first styling |
| Axios | — | HTTP client |
| Context API | — | Global auth state |
| Nginx | alpine | Static file serving in Docker |

---

## Pages & Routes

| Route | Component | Auth required | Description |
|---|---|---|---|
| `/` | `LandingPage` | No | Hero page with feature highlights and CTAs |
| `/login` | `Login` | No (redirects if logged in) | Email/password login form |
| `/register` | `Register` | No (redirects if logged in) | New account registration with password strength indicator |
| `/tasks` | `Tasks` | Yes | Personal task board with create, filter, and delete |
| `/tasks/edit/:id` | `EditTask` | Yes | Edit an existing task |
| `/admin` | `AdminUsers` | Admin only | View and search all registered users |

---

## Environment Variables

| Variable | Description | Default (dev fallback) |
|---|---|---|
| `REACT_APP_API_URL` | Base URL for the TaskFlow API | `http://localhost:5105/api` |

For **local development**, create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:5105/api
```

For **Docker builds**, the variable is injected as a build argument (see `docker-compose.yml`).

> `.env` is git-ignored. Never commit real API URLs or secrets.

---

## Running with Docker

> Prerequisites: Docker and Docker Compose installed. The TaskFlow API must also be running.

From the **root of the monorepo** (where `docker-compose.yml` lives):

```bash
# Set the API URL the browser will call
export REACT_APP_API_URL=http://localhost:4000/api

# Build and start frontend + backend + database
docker compose up --build
```

The app will be available at **http://localhost:3000**.

---

## Local Development

> Prerequisites: Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app starts on **http://localhost:3000** and hot-reloads on file changes.

```bash
# Run tests
npm test

# Build for production
npm run build
```

---

## Project Structure

```
taskflow-frontend/
├── public/
└── src/
    ├── api.js              # Axios instance with base URL + 401 interceptor
    ├── App.js              # Route definitions
    ├── index.css           # Tailwind directives + custom utility classes
    ├── context/
    │   └── AuthContext.js  # JWT storage, decode (username/role), login/logout
    └── components/
        ├── Layout.js       # Sticky header, responsive nav, auth-aware links
        ├── LandingPage.js  # Marketing landing page
        ├── Login.js        # Login form with field validation and loading state
        ├── Register.js     # Registration form with password strength indicator
        ├── Tasks.js        # Task list with inline create form
        ├── EditTask.js     # Task edit form
        └── AdminUsers.js   # Admin-only user table with search
```

---

## Branch History

| Branch | Description |
|---|---|
| `chore/taskflow-frontend-updates` | Initial React setup, Axios config, Auth context |
| `feature/ui-redesign` | Full Tailwind CSS redesign, Layout component, Landing page, responsive nav |
| `feature/login-improvements` | Field-level validation, password toggle, loading spinner, error feedback |
| `feature/user-registration` | Register page with password strength checker and auto-login |
| `feature/admin-users-panel` | Admin users page with role badges and search |


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
