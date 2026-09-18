# Production deployment

The application can run as a Docker container locally or on a container host. It can also be deployed to Vercel: Vite serves the storefront and the `api/` directory supplies the serverless operating-hours endpoints.

## Build and run locally

```sh
docker build -t la-souq .
docker run --rm -p 3000:3000 -e PORT=3000 la-souq
```

Open `http://localhost:3000`. The health check is available at `GET /health`.

## Environment variables

- `PORT`: Assigned automatically by most hosting platforms. Defaults to `3000` locally.
- `ADMIN_HOURS_TOKEN`: Required to unlock the owner-only `/admin/hours` editor.
- `SUPABASE_URL`: URL for the Supabase project that stores the weekly schedule.
- `SUPABASE_SERVICE_ROLE_KEY`: Server-only Supabase key used to read and update the schedule.
- `NODE_ENV`: Set to `production` in the container.

For the required Supabase table and Vercel setup, see `SUPABASE_SETUP.md`.

Do not copy a local `.env` file into the image. Configure secrets through the hosting platform.