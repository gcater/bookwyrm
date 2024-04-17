import React from "react";
import DropDownMenuButton from "./DropDownMenuButton";
const TopBanner = () => {
  return (
    <div className="fixed flex  w-full flex-col">
      <header className=" border-b border-gray-300 bg-white px-4 pt-[25px]">
        <h1 className="relative top-[-5px] text-2xl font-bold text-gray-700">
          BookWyrm
        </h1>
        <div className="flex w-full justify-end">
          <DropDownMenuButton />
        </div>
      </header>
    </div>
  );
};

export default TopBanner;
