import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="flex w-screen justify-around md:justify-between p-4 bg-zinc-950">
        <h2 className="text-xl">Expense Tracker</h2>
        <div>
          <SignedOut>
            <div className="bg-purple-900 py-1 px-4 broder rounded-md">
            <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;
