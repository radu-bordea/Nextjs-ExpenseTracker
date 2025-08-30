import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();
  console.log(user);

  return (
    <nav className="navbar">
      <div className="flex justify-around md:justify-between p-4 bg-zinc-950">
        <h2 className="text-xl">Expense Tracker</h2>
        <div>
          <SignedOut>
            <div className="bg-purple-900 py-1 px-4 rounded-md shadow-md hover:bg-purple-800 transition">
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
