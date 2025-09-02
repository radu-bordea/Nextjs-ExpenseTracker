import { SignInButton } from "@clerk/nextjs"; // Clerk sign-in button component

const Guest = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center text-center mt-8 space-y-6">
      {/* Page heading */}
      <h1 className="text-3xl font-bold">Welcome</h1>

      {/* Subtitle prompting guest to sign in */}
      <p className="text-gray-400">
        Please sign in to manage your transactions
      </p>

      {/* Sign-in button wrapped with styled container */}
      <div className="bg-purple-900 py-1 px-4 rounded-md shadow-md hover:bg-purple-800 transition">
        <SignInButton />
      </div>
    </div>
  );
};

export default Guest;
