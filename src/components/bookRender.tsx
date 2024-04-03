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
type CardProps = React.ComponentProps<typeof Card>;

const BookRender = (): JSX.Element => {
  return ShadCard({});
};

export function ShadCard({ className, ...props }: CardProps) {
  const { data: book, isLoading } = api.book.getLatest.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No books found</div>;

  return (
    // <div className="m-0 flex flex-grow flex-col p-0 sm:ml-[90px] sm:pl-[0 px] sm:pr-[100px]">
    //   <div className="hidden w-full flex-col border-b border-gray-300 pb-6 sm:flex">
    //     <div className="font-suisse mb-3 text-lg font-bold text-gray-700">
    //       {book.title}
    //       {book.author}
    //     </div>
    //     {/* <div className="text-gray-700">
    //       Technology has enabled us to start new companies, new communities, and
    //       new currencies. But can we use it to start new cities, or even new
    //       countries? This book explains how to build the successor to the nation
    //       state, a concept we call the network state.
    //     </div> */}
    //   </div>

    //   {book.chapters && book.chapters.length > 0 && book.chapters.map((chapter, chapterIndex) => (
    //     <div key={chapterIndex} className="pointer-events-auto flex w-full flex-col last:pb-16">
    //       <div className="flex w-full flex-col rounded-xl border border-gray-300">
    //         <div className="border-b border-gray-300 last:border-none">
    //           <div className="font-suisse mb-4 mt-[18px] flex cursor-pointer text-[15px] font-bold leading-6 text-black no-underline sm:text-lg">
    //             {chapterIndex + 1}. {chapter.title}
    //             <div className="clear-button-styles ml-3 box-content h-6 rounded-full border border-solid border-gray-300 p-0 hover:bg-gray-50"></div>
    //           </div>
    //           {chapter.sections && chapter.sections.length > 0 && chapter.sections.map((section, sectionIndex) => (
    //             <div key={sectionIndex} className="border-b border-gray-300 last:border-none">
    //               <a href={`/chapter/${chapterIndex}/section/${sectionIndex}`}>
    //                 <div className="text-black no-underline cursor-pointer flex flex-row items-center font-inter text-sm box-border w-full py-2 px-3 m-0 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50 active:bg-gray-100">
    //                   <div className="clear-button-styles rounded-full p-0 border border-solid border-gray-300 mr-4"></div>
    //                   {section.title}
    //                 </div>
    //               </a>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    //book with dynamic chapters and sections
    <div>
      <Card className={cn("mb-4", className)} {...props}>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>Author: {book.author}</CardDescription>
        </CardHeader>
      </Card>
      {book.chapters &&
        book.chapters.length > 0 &&
        book.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">{chapter.title}</h3>
            {chapter.sections &&
              chapter.sections.length > 0 &&
              chapter.sections.map((section, sectionIndex) => (
                <Card
                  key={sectionIndex}
                  className={cn("mb-2", className)}
                  {...props}
                >
                  <CardContent>
                    <p>{section.title}</p>
                    <p>{section.content}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
    </div>
  );
}

export default BookRender;
