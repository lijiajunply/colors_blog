import { PrismaClient } from "../generated/prisma/client";
import { config } from "dotenv";
import bcrypt from "bcrypt";

// Load environment variables
config();

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

// Initialize admin user if no users exist
async function initializeAdminUser() {
  try {
    // Check if there are any users
    const users = await prisma.user.findMany();
    
    if (users.length === 0) {
      // Hash password
      const hashedPassword = await bcrypt.hash("123456", 10);
      
      // Create admin user
      await prisma.user.create({
        data: {
          id: "admin",
          email: "admin@example.com",
          name: "admin",
          password: hashedPassword,
          identity: "admin",
        },
      });
      
      console.log("Admin user created: email=admin@example.com, password=123456");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}

// Run initialization
initializeAdminUser();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
