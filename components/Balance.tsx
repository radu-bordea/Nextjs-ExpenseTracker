import getUserBalance from "@/app/actions/getUserBalance"; // Server action to fetch user's total balance
import { addCommas } from "@/lib/utils"; // Utility function to format numbers with commas

const Balance = async () => {
  // Fetch balance for the currently logged-in user
  const { balance } = await getUserBalance();

  return (
    <>
      {/* Section heading */}
      <h4>Your Balance</h4>

      {/* Display balance, formatted with commas (default to 0 if undefined) */}
      <h1 className="text-3xl">${addCommas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </>
  );
};

export default Balance;
