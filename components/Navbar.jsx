import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <ThemeToggle/>
      <Link href="/">Dashboard</Link>
      <Link href="/expenses">Expenses</Link>
      <Link href="/analytics">Analytics</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
};

export default Navbar;
