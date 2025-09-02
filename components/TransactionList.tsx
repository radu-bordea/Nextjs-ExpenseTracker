import { Transaction } from "@/types/Transaction";
import getTransactions from "@/app/actions/getTransactions";
import TransactionItem from "./TransactionItem";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if(error) return <p className="text-2xl text-red-400">{error}</p>

  return (
    <div className="mt-4 p-6 md:p-0 w-screen md:w-1/3">
      <h3 className="text-2xl">History</h3>
      <ul className="text-left mt-2 border-t-1 pt-2">
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction}/>
          ))}
      </ul>
    </div>
  );
};

export default TransactionList;
