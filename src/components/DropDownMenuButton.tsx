import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
const DropDownMenuButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <div className="absolute right-4 top-[10px]">
      <div
        className="svg-container cursor-pointer" 
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
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="var(--circle-fill-color)"
            stroke="#D1D5DB"
          />
          <path d="M15 12h.01" strokeWidth="1.2" />
          <path d="M12 12h.01" strokeWidth="1.2" />
          <path d="M9 12h.01" strokeWidth="1.2" />
        </svg>
      </div>

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
    </div>
  );
};
export default DropDownMenuButton;
