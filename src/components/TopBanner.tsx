import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const TopBanner = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <header className=" flex w-full flex-col bg-white  px-4 pb-2 pt-4">
        <h1 className="text-2xl font-bold">BookWyrm</h1>

        <div className="absolute right-4 top-2">
          <div
            className="svg-container cursor-pointer" // Ensure this class is here
            onClick={toggleDropdown}
            style={{ display: "inline-block", lineHeight: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth=".5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-ellipsis"
              onClick={toggleDropdown}
            >
              {/* Apply the CSS variable to the fill attribute */}
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="var(--circle-fill-color)"
                stroke="#D1D5DB"
              />
              <path d="M15 12h.01" strokeWidth="1.4" />
              <path d="M12 12h.01" strokeWidth="1.4" />
              <path d="M9 12h.01" strokeWidth="1.4" />
            </svg>
          </div>
        </div>
      </header>
      <div
        className={`fixed right-4 top-[calc(3rem+21px)] flex items-center ${isDropdownOpen ? "" : "hidden"}`}
      >
        <div className="box-content h-44 w-52 max-w-xl rounded-xl border border-gray-400 bg-white p-4">
          <Link href="#" className="text-md block py-2 font-bold">
            Reviews
          </Link>
          <Link href="#" className="text-md block py-2 font-bold">
            Dashboard
          </Link>
          <Link href="#" className="text-md block py-2 font-bold">
            Twitter
          </Link>

          <div className="pt-[20px]"></div>
          <Button className="w-full rounded-xl"> Subscribe</Button>
        </div>
      </div>
      <div className="pt-[1px]"></div>
      <div className="border-t border-gray-300"></div>
    </div>
  );
};

export default TopBanner;
