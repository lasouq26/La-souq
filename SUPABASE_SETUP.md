# Supabase setup for Vercel

The operating-hours editor stores its weekly schedule in Supabase. Run this once in the Supabase SQL Editor for the project you want to use:

```sql
create table if not exists public.site_settings (
  setting_key text primary key,
  setting_value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
```

The app accesses this table only from server-side code using a Supabase service-role key. Do not expose that key in browser code or prefix it with `VITE_`.

## Vercel environment variables

Add these as **Secret** variables for Production and Preview:

```text
ADMIN_HOURS_TOKEN=<a long private owner access code>
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<Supabase service_role key>
```

You can find the URL and service-role key under **Supabase Dashboard -> Project Settings -> API**. Keep the service-role key private.

After adding the variables and running the SQL, deploy the project. Visit `/admin/hours`, enter `ADMIN_HOURS_TOKEN`, and save the weekly schedule. The public storefront reads the same persisted schedule.