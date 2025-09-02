"use server";
import { db } from "@/lib/db"; // Database client (e.g., Prisma)
import { auth } from "@clerk/nextjs/server"; // Clerk authentication (server-side)
import { revalidatePath } from "next/cache"; // Revalidate cached routes after mutations

async function deleteTransaction(transactionId: string): Promise<{
  message?: string;
  error?: string;
}> {
  // Get the currently logged-in user's ID
  const { userId } = await auth();

  // If there is no authenticated user, stop here
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Delete the transaction that belongs to this user.
    // NOTE: Prisma's `delete` requires a UNIQUE "where" clause.
    // This assumes your schema has a unique constraint that matches { id, userId }
    // (e.g., @@unique([id, userId])). If not, use `deleteMany({ where: { id: transactionId, userId } })`.
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    // Invalidate the homepage so UI reflects the deletion immediately
    revalidatePath("/");

    // Return a friendly success message
    return { message: "Transaction deleted" };
  } catch (error) {
    // Hide internal details; expose a generic, user-facing error
    return { error: "Database error" };
  }
}

export default deleteTransaction;
