const { connectDb } = require('../config/db');
const { User } = require('../models/User');

async function run() {
  await connectDb();

  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@ems.com';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';
  const name = process.env.SEED_ADMIN_NAME ?? 'Admin';

  const existing = await User.findOne({ email });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log('Admin already exists:', email);
    process.exit(0);
  }

  const passwordHash = await User.hashPassword(password);
  await User.create({ name, email, role: 'admin', passwordHash });

  // eslint-disable-next-line no-console
  console.log('Seeded admin:', { email, password });
  process.exit(0);
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

