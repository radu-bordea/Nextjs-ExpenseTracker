"use client";

import { useState } from "react";
import { Transaction } from "@/types/Transaction";
import { addCommas } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";

type Props = { transaction: Transaction };

const TransactionItem = ({ transaction }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const sign = transaction.amount < 0 ? "-" : "+";
  const amountClass =
    transaction.amount < 0 ? "text-red-400" : "text-green-400";
  const borderClass =
    transaction.amount < 0
      ? "border-red-500/30 hover:border-red-500/50"
      : "border-emerald-500/30 hover:border-emerald-500/50";

  const handleDeleteTransaction = async (transactionId: string) => {
    if (isDeleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const { message, error } = await deleteTransaction(transactionId);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(message || "Transaction deleted");
    } catch (err) {
      toast.error("Something went wrong while deleting. Please try again.");
      // Optional: console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li
      className={`group flex items-center justify-between px-4 py-2 mt-2 rounded-md border-b transition-colors ${borderClass}`}
    >
      {/* Left: text */}
      <span className="truncate text-zinc-200">{transaction.text}</span>

      {/* Right: amount + delete */}
      <span className="flex items-center gap-2">
        <span className={`font-medium tabular-nums ${amountClass}`}>
          {sign}${addCommas(Math.abs(transaction.amount))}
        </span>

        {/* Mobile-first: visible by default.
            Desktop (md+): only visible on hover/focus of the row or the button. */}
        <button
          type="button"
          onClick={() => handleDeleteTransaction(transaction.id)}
          aria-label={`Delete transaction "${transaction.text}"`}
          title="Delete"
          disabled={isDeleting}
          className={`inline-flex w-6 items-center justify-center rounded-md
                      bg-red-600/85 hover:bg-red-600 text-white text-sm
                      ring-1 ring-red-400/30
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70
                      active:scale-[0.98]
                      transition-all
                      /* Visibility rules */
                      opacity-100 pointer-events-auto
                      md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100
                      md:pointer-events-none md:group-hover:pointer-events-auto md:focus:pointer-events-auto
                      /* Disabled visuals */
                      disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isDeleting ? "…" : "×"}
        </button>
      </span>
    </li>
  );
};

export default TransactionItem;
