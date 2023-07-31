// React
import React from "react";

// Next.js
import Link from "next/link";

export default function Navbar({ homeHandler }) {

  // Not much to say here, it's a header
  return (
    <nav className="w-full flex flex-row md:flex-col justify-between flex-wrap bg-blue-500 p-6 relative z-10">
      
      {
        // Left side
      }
      <div className="w-1/2 flex flex-shrink-0 text-white z-10">
        <span className="font-semibold text-xl tracking-tight">Imaginary Products</span>
      </div>

      {
        // Right side
      }
      <div className="w-1/2 flex flex-shrink-0 lg:flex lg:items-center lg:w-auto z-10 align-middle justify-end items-center md:justify-start">
        <div className="text-sm lg:flex-grow align-end md:w-auto">
          <Link href="/" className="inline-block lg:inline-block text-gray-200 hover:text-white mr-4 align-middle" onClick={homeHandler}>
            Home
          </Link>
          <Link href="/about" className="inline-block lg:inline-block text-gray-200 hover:text-white mr-4 align-middle">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};