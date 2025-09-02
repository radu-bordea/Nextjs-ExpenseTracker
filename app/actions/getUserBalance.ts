"use server";
import { db } from "@/lib/db"; // Database client
import { auth } from "@clerk/nextjs/server"; // Clerk authentication

async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  // Get the currently logged-in user from Clerk
  const { userId } = await auth();

  // If no user is logged in, return an error
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Fetch all transactions belonging to the user
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    // Calculate the total balance by summing all amounts
    // (income adds to balance, expenses subtract from balance)
    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0 // initial sum
    );

    // Return the final balance
    return { balance };
  } catch (error) {
    // Return a generic error if database fetch fails
    return { error: "Database error" };
  }
}

export default getUserBalance;

/*
  🔑 Difference from getIncomeExpense:
  - getIncomeExpense separates transactions into two categories:
      → income (positive numbers)
      → expense (negative numbers, returned as positive)
  - getUserBalance instead calculates the *net total* (income - expenses)
    by directly summing all transaction amounts.
*/
