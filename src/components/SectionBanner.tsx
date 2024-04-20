import React from "react";
import DropDownBookButton from "./DropDownBookButton";
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import { api } from "~/utils/api";
import ToggleFormButton from "./ToggleFormButton";
const SectionBanner = ({
  bookId,
  chapterId,
  sectionId,
  onToggleUpdate: toggleUpdate,
}: {
  bookId: string;
  chapterId: string;
  sectionId: string;
  onToggleUpdate: () => void;
}) => {
  const { data: retrievedBook } = api.book.getBook.useQuery(bookId);
  if (!retrievedBook) return <p>No book found!</p>;
  return (
    <div className="fixed flex w-full flex-col">
      <header className=" border-b border-gray-300 bg-white px-4 pt-[25px]">
        <h1 className="relative top-[-5px] text-2xl font-bold text-gray-700">
          <Link href={`/book/${bookId}`}>BookWyrm</Link>
        </h1>
        <ProgressBar
          bookId={bookId}
          chapterId={chapterId}
          sectionId={sectionId}
        />
        <ToggleFormButton
          onClick={() => {
            toggleUpdate();
          }}
        />
        <div className="flex w-full justify-end">
          <DropDownBookButton bookId={bookId} />
        </div>
      </header>
    </div>
  );
};

export default SectionBanner;
