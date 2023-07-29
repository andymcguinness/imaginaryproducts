import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between flex-wrap bg-blue-500 p-6 relative z-10">
      <div className="flex flex-shrink-0 text-white mr-6 z-10">
        <span className="font-semibold text-xl tracking-tight">Imaginary Products</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto z-10 align-middle">
        <div className="text-sm lg:flex-grow align-middle">
          <Link href="/" className="block lg:inline-block text-gray-200 hover:text-white mr-4">
            Home
          </Link>
          <Link href="/about" className="block lg:inline-block text-gray-200 hover:text-white mr-4">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};