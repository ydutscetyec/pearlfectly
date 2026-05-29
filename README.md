# Pearlfectly — Next.js storefront

This repository is a small Next.js app (app router) for a pearl jewelry storefront and admin dashboard.

Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

Admin

- Visit `/signup` to create the first account — the first created user is automatically set as admin.
- Admin dashboard: `/admin` (requires sign-in)

Pre-launch checklist (recommended)

- Use a managed database (Postgres / Supabase / PlanetScale) instead of local JSON files.
- Hash passwords (done using `bcryptjs`).
- Add an `isAdmin` role and secure admin endpoints (basic gating implemented).
- Move secrets to environment variables and configure them in your host (Vercel secrets).
- Integrate a payment provider (Stripe) for production checkout.
- Add tests and CI (GitHub Actions).
- Add monitoring/logging and backups.

Deployment

- Push to GitHub and connect to Vercel for simple deployments.
- Configure environment variables in Vercel dashboard (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, provider client IDs).

Security notes

- Do not commit `.env.local` or `data/*.json` containing real user data.
- Rotate secrets if they were accidentally committed.

Contact

If you want help migrating to a database, setting up CI, or production hardening, I can implement the next steps.
