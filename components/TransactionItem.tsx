import { Transaction } from "@/types/Transaction";
import { addCommas } from "@/lib/utils";
import { toast } from "react-toastify";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {

    const sign = transaction.amount < 0 ? '-' : '+'

  return (
    <li className="flex justify-between px-4 py-1">
      {transaction.text}
      <span
        className={`${
          transaction.amount < 0 ? "text-green-300" : "text-red-400"
        }`}
      >
        {sign}${addCommas(Math.abs(transaction.amount))}
      </span>
    </li>
  );
};

export default TransactionItem;
