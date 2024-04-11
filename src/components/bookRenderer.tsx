import React from "react";
import { api } from "~/utils/api";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/router";

const BookRenderer = ({ bookId }: { bookId: string }) => {
  const router = useRouter(); // This ensures `router` is correctly typed
  const { data: book, isLoading } = api.book.getBook.useQuery(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No books found</div>;

  return (
    <div className="m-0 flex flex-grow flex-col p-0 sm:ml-[90px] sm:pl-[50px] sm:pr-[100px]">
      <div className="hidden w-full flex-col border-b border-gray-300 pb-6 sm:flex">
        <div className="font-sans-serif mb-3 text-lg font-bold text-gray-700">
          Description
        </div>
        <div className="text-gray-700">
          Technology has enabled us to start new companies, new communities, and
          new currencies. But can we use it to start new cities, or even new
          countries? This book explains how to build the successor to the nation
          state, a concept we call the network state.
        </div>
      </div>

      <div>
        {book.chapters &&
          book.chapters.length > 0 &&
          book.chapters
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">{chapter.title}</h3>
                <div className="flex w-full flex-col rounded-xl border border-gray-300">
                  {chapter.sections &&
                    chapter.sections.length > 0 &&
                    chapter.sections
                      .sort(
                        (a, b) =>
                          new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime(),
                      )
                      .map((section, sectionIndex) => (
                        <a
                          key={sectionIndex}
                          onClick={() =>
                            router.push(
                              `/book/${bookId}/${chapter.id}/${section.id}`,
                            )
                          }
                          className="font-inter m-0 box-border flex w-full cursor-pointer flex-row items-center border-b border-gray-300 px-3 py-2 text-sm text-black no-underline first:rounded-t-xl last:rounded-b-xl last:border-none hover:bg-gray-50 active:bg-gray-100"
                        >
                          <div className="clear-button-styles mr-4 rounded-full border border-solid border-gray-300 p-0"></div>
                          {section.title}
                        </a>
                      ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BookRenderer;
