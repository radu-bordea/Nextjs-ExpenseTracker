"use client"; // Mark this file as a Client Component (needed for hooks, browser APIs, toasts)

import { Transaction } from "@/types/Transaction"; // Type describing a single transaction
import { addCommas } from "@/lib/utils"; // Formats numbers like 12345 -> "12,345"
import { toast } from "react-toastify"; // Toast notifications
import deleteTransaction from "@/app/actions/deleteTransaction"; // Server action to delete a transaction

// Renders one transaction row with amount and a hover-revealed "delete" button
const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  // Prefix to show before the amount (negative -> "-", positive -> "+")
  const sign = transaction.amount < 0 ? "-" : "+";

  // Handle delete click: confirm, call server action, show toast
  const handleDeleteTransaction = async (transactionId: string) => {
    // Simple browser confirm dialog; bail out if user cancels
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmed) return;

    // Call the server action; expects { message?: string; error?: string }
    const { message, error } = await deleteTransaction(transactionId);

    // If server reported an error, show it and stop (avoid firing a success toast)
    if (error) {
      toast.error(error);
      return; // prevent success toast on failure
    }

    // Success toast (message may be customized by the server)
    toast.success(message || "Transaction deleted");
  };

  return (
    <li
      className={`group flex items-center justify-between px-4 py-2 mt-2 rounded-md border-b transition-colors
      ${
        // Color the border based on positive/negative amount
        transaction.amount < 0
          ? "border-red-500/30 hover:border-red-500/50"
          : "border-emerald-500/30 hover:border-emerald-500/50"
      }`}
    >
      {/* Left: transaction text (truncated to keep row tidy) */}
      <span className="truncate text-zinc-200">{transaction.text}</span>

      {/* Right: amount + delete button */}
      <span className="flex items-center gap-2">
        {/* Amount with tabular-nums for aligned digits */}
        <span
          className={`font-medium tabular-nums ${
            transaction.amount < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {sign}${addCommas(Math.abs(transaction.amount))}
        </span>

        {/* Delete button:
            - Hidden visually until the <li> is hovered (via group/group-hover)
            - Keep layout stable using opacity (no width changes)
            - Disable clicks until visible with pointer-events-none
        */}
        <button
          onClick={() => handleDeleteTransaction(transaction.id)}
          aria-label="Delete transaction"
          title="Delete"
          className="inline-flex h-6 w-6 items-center justify-center rounded-md
                     bg-red-600/80 hover:bg-red-600 text-white text-xs
                     ring-1 ring-red-400/30
                     opacity-0 group-hover:opacity-100 focus:opacity-100
                     pointer-events-none group-hover:pointer-events-auto focus:pointer-events-auto
                     transition-opacity"
        >
          ×
        </button>
      </span>
    </li>
  );
};

export default TransactionItem;
