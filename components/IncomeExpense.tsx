import getIncomeExpense from "@/app/actions/getIncomeExpense"; // Import server action to fetch income & expense totals

const IncomeExpense = async () => {
  // Fetch income and expense values from the database via server action
  const { income, expense } = await getIncomeExpense();

  return (
    <div className="container flex justify-around mt-2 md:max-w-1/4">
      {/* Income Section */}
      <div className="py-4 md:px-4">
        <h4>INCOME</h4>
        {/* Display total income in green */}
        <p className="text-green-400">${income}</p>
      </div>

      {/* Vertical divider between income and expense */}
      <div className="border-x-1 h-1/2 my-auto"></div>

      {/* Expense Section */}
      <div className="py-4 md:px-4">
        <h4>EXPENSE</h4>
        {/* Display total expense in red */}
        <p className="text-red-400">${expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
