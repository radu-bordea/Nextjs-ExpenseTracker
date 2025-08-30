"use client";

import addTransaction from "@/app/actions/addTransactions";
import { toast } from "react-toastify";

const AddTransactions = () => {
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-12 mt-16">
      <h3 className="border-b border-b-cyan-800 w-full text-left pb-2">
        Add Transaction
      </h3>
      <form
        action={clientAction}
        className="flex flex-col items-start space-y-4"
      >
        <div className="flex flex-col items-start space-y-2 w-full">
          <label htmlFor="text">Text</label>
          <input
            className="bg-gray-800 w-full"
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="flex flex-col items-start space-y-2 w-full">
          <label htmlFor="amount">
            Amount (negative - expense, positive - income)
          </label>
          <input
            className="bg-gray-800 w-full"
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </div>
        <button className="w-full bg-purple-900 py-1 px-4 rounded-md shadow-md hover:bg-purple-800 transition">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactions;
