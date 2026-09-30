# Lakeside Hotel

React and Vite frontend for room search, reservations, account access, and hotel administration.

## Requirements

- Node.js 18 or newer
- npm
- A compatible hotel REST API for room, booking, and account operations

This workspace contains the frontend only. The Spring Boot service and database are not included, so API-backed pages require that service to be running separately.

## Run Locally

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The frontend defaults to `http://localhost:8080` for the API. Set `VITE_API_BASE_URL` in `.env.local` if the service uses another address:

```dotenv
VITE_API_BASE_URL=http://localhost:8080
```

Vite exposes `VITE_` variables to browser code. Do not put credentials or other secrets in them. The backend must allow the Vite origin through its CORS configuration and provide the endpoints used by `src/components/utils/ApiFunctions.js`.

## Checks

```powershell
npm run lint
npm run build
npm run preview
```

There is currently no automated test script in `package.json`. Booking, login, registration, profile, and administration operations cannot be verified without the compatible API and its database.