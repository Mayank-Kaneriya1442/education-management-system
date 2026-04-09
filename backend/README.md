# Education Management System (Backend)

## Setup

1. Install dependencies

```bash
cd backend
npm install
```

2. Create `.env`

Copy `.env.example` to `.env` and update values.

3. Seed an admin user (optional but recommended)

```bash
npm run seed:admin
```

Default admin:
- Email: `admin@ems.com`
- Password: `Admin@123`

4. Run API

```bash
npm run dev
```

Health check: `GET /api/health`

