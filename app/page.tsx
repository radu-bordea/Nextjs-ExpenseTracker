import AddTransactions from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return <Guest />;

  return (
    <main className="flex flex-col justify-start items-center w-screen h-screen text-center mt-8">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h2>
      <Balance />
      <IncomeExpense />
      <AddTransactions />
      <TransactionList/>
    </main>
  );
};

export default HomePage;
