"use server";
import { auth } from "@clerk/nextjs/server"; // Clerk authentication
import { db } from "@/lib/db"; // Database client
import { revalidatePath } from "next/cache"; // Revalidate cache after mutations

// Transaction input type
interface TransactionData {
  text: string;
  amount: number;
}

// Return type for the addTransaction function
interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  // Extract values from submitted form
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  // Check if values exist and are not empty
  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or amount is missing" };
  }

  // Convert input values to correct types
  const text: string = textValue.toString(); // Ensure text is stored as a string
  const amount: number = parseFloat(amountValue.toString()); // Parse amount into a number

  // Get the logged-in user from Clerk
  const { userId } = await auth();

  // If no user is found, return error
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Create a new transaction in the database
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    // Revalidate homepage cache so UI updates with the new transaction
    revalidatePath("/");

    // Return the newly created transaction
    return { data: transactionData };
  } catch (error) {
    // Handle database errors
    return { error: "Transaction not added" };
  }
}

export default addTransaction;
