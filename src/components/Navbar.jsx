"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data:session,isPending} = useSession()
  const user = session?.user
  const handleSignOut=async()=>{
     await signOut()
  }

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="w-full bg-[#292929] px-4 py-3 sm:px-6 lg:px-10">
      <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between rounded-2xl bg-[#202020] px-5 py-3 shadow-sm sm:px-6 lg:px-7">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          
        >
          <Image src={'/assets/logo.png'} height={80} width={80} alt="logo"></Image>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-normal text-white/90 transition-colors duration-200 hover:text-[#8174ff]"
            >
              {link.name}
            </Link>
          ))}

          <span
            aria-hidden="true"
            className="h-5 w-px bg-white/15"
          />

            { user ? (
            <>
            Hi, {user.name}!
            <Button onClick={handleSignOut} variant="ghost">SignOut</Button>
            </>

            ):(
              
              <Link
              href="/auth/signin"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#8174ff] transition-colors hover:bg-white/5"
            >
              Sign In
            </Link>)}
          <Link
            href="/auth/signup"
            className="inline-flex h-[42px] min-w-[115px] items-center justify-center rounded-xl bg-gradient-to-r from-[#6957ff] to-[#6555ff] px-5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(101,85,255,0.15)] transition duration-200 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(101,85,255,0.3)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`absolute left-0 right-0 top-[calc(100%+10px)] z-50 rounded-2xl border border-white/10 bg-[#202020] p-5 shadow-2xl transition-all duration-200 md:hidden ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5 hover:text-[#8174ff]"
              >
                {link.name}
              </Link>
            ))}

            <span
              aria-hidden="true"
              className="my-2 h-px w-full bg-white/10"
            />

            { user ? (
            <>
            Hi {user.name}
            <Button variant="ghost">SignOut</Button>
            </>

            ):(
              
              <Link
              href="/auth/signin"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#8174ff] transition-colors hover:bg-white/5"
            >
              Sign In
            </Link>)}

            <Link
              href="/auth/signup"
              onClick={closeMenu}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6957ff] to-[#6555ff] px-5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;