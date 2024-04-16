import React, { useState } from "react";
import { LucideProps } from "lucide-react";
const TopBanner = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <header className="flex w-full flex-col border-b border-gray-300 bg-white px-4 py-2">
        <h1 className="text-2xl font-bold">BookWyrm</h1>

        <div className="dropdownToggleBtn  absolute right-0">
          <div className="px-4">
            <div className="svg-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width=".5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-circle-ellipsis"
              >
                <circle cx="12" cy="12" r="10" stroke="#D1D5DB" />
                <path d="M15 12h.01" stroke-width="1.5" />
                <path d="M12 12h.01" stroke-width="1.5" />
                <path d="M9 12h.01" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopBanner;
