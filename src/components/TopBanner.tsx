import React, { useState } from "react";

const TopBanner = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <header className="flex w-full flex-col border-b border-gray-300 bg-white px-4 py-2">
        <h1 className="text-2xl font-bold">BookWyrm</h1>

        <div className="absolute right-0">
          <div
            className="svg-container cursor-pointer" // Ensure this class is here
            onClick={toggleDropdown}
            style={{ display: "inline-block", lineHeight: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
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
              <path d="M15 12h.01" strokeWidth="1.5" />
              <path d="M12 12h.01" strokeWidth="1.5" />
              <path d="M9 12h.01" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </header>
      <div
        className={`fixed right-4 top-[calc(3rem+12px)] flex items-center ${isDropdownOpen ? "" : "hidden"}`}
      >
        <div className="box-content h-32 w-48 max-w-xs rounded-md border border-gray-400 bg-white p-4 shadow-lg"></div>
      </div>
    </div>
  );
};

export default TopBanner;
