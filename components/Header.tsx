import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; // Clerk authentication UI components
import { checkUser } from "@/lib/checkUser"; // Utility function to verify/create user in DB

const Header = async () => {
  // Ensure the authenticated user exists in the database
  const user = await checkUser();
  console.log(user); // Debug: log user info (can be removed in production)

  return (
    <nav className="navbar">
      {/* Container for header content */}
      <div className="flex justify-around md:justify-between p-4 bg-zinc-900">
        {/* App name / logo */}
        <h2 className="text-xl">Expense Tracker</h2>

        {/* Auth section: show different UI depending on sign-in state */}
        <div>
          {/* If user is signed out, show sign-in button */}
          <SignedOut>
            <div className="bg-purple-900 py-1 px-4 rounded-md shadow-md hover:bg-purple-800 transition">
              <SignInButton />
            </div>
          </SignedOut>

          {/* If user is signed in, show user menu/button */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;
