import React from "react";
import DropDownBookButton from "./DropDownBookButton";
import { Progress } from "@/components/ui/progress"
import Link from "next/link";
import { api } from "~/utils/api";
const SectionBanner = ({ bookId }: { bookId: string }) => {
    const { data: retrievedBook } = api.book.getBook.useQuery(bookId);
    if (!retrievedBook) return <p>No book found!</p>;
  return (
    <div className="fixed flex w-full flex-col">
      <header className=" border-b border-gray-300 bg-white px-4 pt-[25px]">
        <h1 className="relative top-[-5px] text-2xl font-bold text-gray-700">
          <Link href={`/book/${bookId}`}>BookWyrm</Link>
        </h1>
        <div className="flex justify-center relative -top-7 max-w-[500px] mx-auto">
          <div className="flex w-full justify-between">
            <div className="w-1/2">
              <Progress/>
            </div>
            <div className="w-1/2">
              <Progress/>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <DropDownBookButton bookId={bookId} />
        </div>
      </header>
    </div>
  );
};

export default SectionBanner;
