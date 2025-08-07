"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-screen flex items-center justify-between  p-4">
      <ThemeToggle />
      <div className="hidden lg:flex gap-6 items-center p-4 border-b">
        <Link href="/">Dashboard</Link>
        <Link href="/expenses">Expenses</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={48} />}
        </Button>
      </div>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center gap-6 text-xl font-medium z-40 transition-all">
          {/* <ThemeSwitcher /> */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link href="/expenses" onClick={() => setIsOpen(false)}>
            Expenses
          </Link>
          <Link href="/analytics" onClick={() => setIsOpen(false)}>
            Analytics
          </Link>
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          {/* Right side: Auth buttons */}
          <div className="block lg:hidden flex gap-4 items-center">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6"
          >
            <X size={28} />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
