import { Transaction } from "@/types/Transaction"; // Type for a transaction row
import getTransactions from "@/app/actions/getTransactions"; // Server action to load user's transactions
import TransactionItem from "./TransactionItem"; // Child component that renders a single transaction

const TransactionList = async () => {
  // Fetch transactions for the authenticated user
  const { transactions, error } = await getTransactions();

  // If we got an error from the server action, render it
  if (error) return <p className="text-2xl text-red-400">{error}</p>;

  return (
    <div className="mt-4 p-6 md:p-0 w-screen md:w-1/3">
      {/* Section heading */}
      <h3 className="text-2xl">History</h3>

      {/* 
        List container for transactions.
        NOTE: Tailwind doesn't support "border-t-1"; use "border-t" (1px) instead.
      */}
      <ul className="text-left mt-2 border-t pt-2">
        {/* Guard against undefined and render each transaction item */}
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </div>
  );
};

export default TransactionList;
