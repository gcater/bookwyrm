import React, { useState } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
const DropBookButton = ({ bookId }: { bookId: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: book } = api.book.getBook.useQuery(bookId);
  if (!book) return <div>No book found</div>;
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <div className="absolute right-4 top-[10px]">
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
                <circle cx="9" cy="9" r=".25" fill="black" />
                <line x1="11" y1="9" x2="15" y2="9" strokeWidth=".7" />
                {/* Dot and line for the middle position */}
                <circle cx="9" cy="12" r=".25" fill="black" />
                <line x1="11" y1="12" x2="15" y2="12" strokeWidth=".7" />
                {/* Dot and line for the bottom position */}
                <circle cx="9" cy="15" r=".25" fill="black" />
                <line x1="11" y1="15" x2="15" y2="15" strokeWidth=".7" />
          
        </svg>
      </div>

      <div
        className={`fixed right-4 top-[calc(3rem+21px)] flex items-center ${isDropdownOpen ? "" : "hidden"}`}
      >
        <div className="box-content h-auto w-96 max-w-xl rounded-xl border border-gray-400 bg-white">
          <div className="w-full">
            {book.chapters &&
              book.chapters.length > 0 &&
              book.chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="mb-4 w-full border-gray-300 "
                >
                  <Link
                    href={`/book/${bookId}/${chapter.id}/${chapter?.sections?.[0]?.id}`}
                  >
                    <div></div>
                    <h3>{`${chapterIndex + 1}. ${chapter.title}`}</h3>
                  </Link>
                  {chapter.sections && chapter.sections.length > 0 && (
                    <div className="flex w-full flex-col">
                      {chapter.sections.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="w-full border-t border-gray-300"
                        >
                          <div className="hover:bg-gray-50">
                            <Link
                              href={`/book/${bookId}/${chapter.id}/${section.id}`}
                              className="cursor-pointer text-black"
                            >
                              <div className="py-2">
                                <div className="px-4">{section.title}</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="pt-[px]"></div>
        <div className="border-t border-gray-300"></div>
      </div>
    </div>
  );
};
export default DropBookButton;
