import AddTransactions from "@/components/AddTransaction";
import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return <Guest />;

  return (
    <main className="flex flex-col justify-start items-center w-screen h-screen text-center mt-8">
      <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
      <AddTransactions/>
    </main>
  );
};

export default HomePage;
