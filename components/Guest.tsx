import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center text-center mt-8 space-y-6">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="text-gray-400">
        Please sign in to manage your transactions
      </p>
      <div className="bg-purple-900 py-1 px-4 rounded-md shadow-md hover:bg-purple-800 transition">
        <SignInButton />
      </div>
    </div>
  );
};

export default Guest;
