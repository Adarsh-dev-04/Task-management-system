# Task Management System

MERN task manager for the internship assessment.

## What is included

- JWT authentication with register and login
- Protected task CRUD routes
- Task status toggle between pending and completed
- Search, filter, and pagination on the task list
- React + Vite frontend with Login, Register, and Dashboard pages

## Backend setup

1. Open `backend`.
2. Copy `.env.example` to `.env`.
3. Set `MONGO_URI` and `JWT_SECRET`.
4. Run `npm install`.
5. Start the API with `npm run dev`.

## Frontend setup

1. Open `frontend`.
2. Copy `.env.example` to `.env` if you want to override the API URL.
3. Run `npm install`.
4. Start the client with `npm run dev`.

## Environment variables

Backend `.env`:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
NODE_ENV=development
```

Frontend `.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/toggle`

## Notes

- Tasks are scoped to the authenticated user.
- Search uses the `search` query string, status filtering uses `status`, and pagination uses `page` and `limit`.