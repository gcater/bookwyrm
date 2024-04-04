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

type ExtendedCardProps = CardProps & { bookid: string };

const BookRender = ({ bookid }: { bookid: string }): JSX.Element => {
  return ShadCard({ bookid });
};

export function ShadCard({ bookid, className, ...props }: ExtendedCardProps) {
  const { data: book, isLoading } = api.book.getBook.useQuery(bookid);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No books found</div>;

  return (
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
        [...book.chapters]
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">{chapter.title}</h3>
              {chapter.sections &&
                chapter.sections.length > 0 &&
                [...chapter.sections]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((section, sectionIndex) => (
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
