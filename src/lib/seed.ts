import { prisma } from './prisma';
import bcrypt from 'bcrypt';

async function seed() {
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { id: 'admin' },
  });

  if (!existingAdmin) {
    // Create admin user
    const hashedPassword = await bcrypt.hash('123', 10);
    
    await prisma.user.create({
      data: {
        id: 'admin',
        email: 'admin@example.com',
        name: 'admin',
        password: hashedPassword,
        identity: 'admin',
      },
    });

    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
