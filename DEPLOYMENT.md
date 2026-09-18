# Production deployment

The application is packaged as a production Docker container and can be deployed to any host that supports containers.

## Build and run locally

```sh
docker build -t la-souq .
docker run --rm -p 3000:3000 -e PORT=3000 la-souq
```

Open `http://localhost:3000`. The health check is available at `GET /health`.

## Environment variables

- `PORT`: Assigned automatically by most hosting platforms. Defaults to `3000` locally.
- `GOOGLE_MAPS_API_KEY`: Optional. When absent, the application keeps using its existing fallback business hours.
- `ADMIN_HOURS_TOKEN`: Required to unlock the owner-only `/admin/hours` editor. Use a long, unique secret and share it only with the owner.
- `HOURS_DATA_FILE`: Optional location for persisted weekly-hours data. The Docker image defaults to `/data/hours.json`; mount `/data` to durable storage to retain changes across deployments.
- `NODE_ENV`: Set to `production` in the container.

Do not copy a local `.env` file into the image. Configure secrets through the hosting platform.
