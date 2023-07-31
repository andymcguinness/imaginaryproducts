// React
import React from "react";

// Next.js
import Link from "next/link";

export default function Footer() {

  // Not much to say here, it's a footer
  return (
    <footer className="md:fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Powered by OpenAI and Next.js. Built by Andy McGuinness.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <Link href="/about" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">About</Link>
            </li>
        </ul>
    </footer>
  );
};