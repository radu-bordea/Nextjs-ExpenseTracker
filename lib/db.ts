import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
declare global {
  // Allow `globalThis.prisma` to exist
  var prisma: PrismaClient | undefined;
}

// Use existing client if available, otherwise create new
export const db = globalThis.prisma || new PrismaClient();

// Only assign to global in non-production
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

