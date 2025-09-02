"use server";
import { db } from "@/lib/db"; // Database client (e.g., Prisma)
import { auth } from "@clerk/nextjs/server"; // Clerk authentication
import { Transaction } from "@/types/Transaction";

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  // Get the currently logged-in user's ID
  const { userId } = await auth();

  // If no user is authenticated, bail early
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Fetch this user's transactions, newest first
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Return results in a consistent envelope
    return { transactions };
  } catch (error) {
    // Hide internal error details from the client; keep message generic
    return { error: "Database error" };
  }
}

export default getTransactions;
