"use server";
import { db } from "@/lib/db"; // Import database client
import { auth } from "@clerk/nextjs/server"; // Import authentication from Clerk

// Function to fetch a user's total income and expenses
async function getIncomeExpense(): Promise<{
  income?: number; // Total positive transactions
  expense?: number; // Total negative transactions (returned as positive)
  error?: string; // Error message if something goes wrong
}> {
  // Get the currently logged-in user's ID from Clerk auth
  const { userId } = await auth();

  // If no user is authenticated, return an error
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Fetch all transactions that belong to the logged-in user
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    // Extract only the amounts from the transactions
    const amounts = transactions.map((transaction) => transaction.amount);

    // Calculate total income (all positive amounts summed up)
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);

    // Calculate total expenses (all negative amounts summed, then made positive)
    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);

    // Return the totals, ensuring expense is a positive number
    return { income, expense: Math.abs(expense) };
  } catch (error) {
    // If a database error occurs, return a generic error message
    return { error: "Database error" };
  }
}

export default getIncomeExpense;
