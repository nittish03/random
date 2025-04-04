"use client";

import React from "react";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-black/80 backdrop-blur-md shadow-md z-50">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
        <h1 className="font-bold text-4xl gradient-text">WorkWise</h1>

        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <a target="_blank" href="https://ai-course-generator-gamma-snowy.vercel.app/dashboard">
              <button className="hidden md:inline-flex px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                Course Generator
              </button>
            </a>
            <Link href="/chat">
              <button className="hidden md:inline-flex px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                Chat With Mentor
              </button>
            </Link>
            <Link href="/guidance">
              <button className="hidden md:inline-flex px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                Mentor Guidance
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="hidden md:inline-flex px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                
                Industry Insights
              </button>
              <button className="md:hidden w-10 h-10 p-2 flex items-center justify-center border border-white text-white rounded-md hover:bg-white hover:text-black">
                
                <LayoutDashboard className="h-5 w-5" />
                
              </button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                  <StarsIcon className="h-4 w-4 mr-2" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-black text-white shadow-lg rounded-md p-2 border border-white">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center px-3 py-2 hover:bg-white hover:text-black rounded-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center px-3 py-2 hover:bg-white hover:text-black rounded-md">
                    <PenBox className="h-4 w-4 mr-2" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center px-3 py-2 hover:bg-white hover:text-black rounded-md">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-lg bg-black border border-white text-white",
                  userPreviewMainIdentifier: "font-semibold text-white",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
