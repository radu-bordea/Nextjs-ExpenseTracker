"use client";

import { useRef } from "react";
import addTransaction from "@/app/actions/addTransactions"; // Server action to add a new transaction
import { toast } from "react-toastify"; // Notification library

const AddTransactions = () => {
  // Reference to the form element (so we can reset it after submission)
  const formRef = useRef<HTMLFormElement>(null);

  // Client action that runs when the form is submitted
  const clientAction = async (formData: FormData) => {
    // Call the server action to add a transaction
    const { data, error } = await addTransaction(formData);

    // If server returned an error, show error toast
    if (error) {
      toast.error(error);
    } else {
      // Otherwise show success toast and reset form fields
      toast.success("Transaction added");
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col items-start space-y-12 mt-16">
      {/* Section heading */}
      <h3 className="border-b border-b-cyan-800 w-full text-left pb-2">
        Add Transaction
      </h3>

      {/* Form to submit new transaction */}
      <form
        ref={formRef} // Attach form reference
        action={clientAction} // Handle form submission with clientAction
        className="flex flex-col items-start space-y-4"
      >
        {/* Transaction text input */}
        <div className="flex flex-col items-start space-y-2 w-full">
          <label htmlFor="text">Text</label>
          <input
            className="border bg-gray-900 border-gray-800 w-full p-1 rounded-sm"
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..." // Example: "Salary" or "Groceries"
          />
        </div>

        {/* Transaction amount input */}
        <div className="flex flex-col items-start space-y-2 w-full">
          <label htmlFor="amount">
            Amount (negative - expense, positive - income)
          </label>
          <input
            className="border bg-gray-900 border-gray-800 w-full p-1 rounded-sm"
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..." // Example: -50 for expense, 1000 for income
            step="0.01" // Allows decimals
          />
        </div>

        {/* Submit button */}
        <button className="w-full bg-purple-800 text-gray-300 hover:text-gray-200 py-1 px-4 rounded-md shadow-md hover:bg-purple-700 transition">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactions;
