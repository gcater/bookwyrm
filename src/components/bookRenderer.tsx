import React from "react";
import { api } from "~/utils/api";

import { useRouter } from "next/router";

const BookRenderer = ({ bookId }: { bookId: string }) => {
  const router = useRouter(); // This ensures `router` is correctly typed
  const { data: book, isLoading } = api.book.getBook.useQuery(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No books found</div>;

  return (
    <div>
      {/* Displaying the book name and author name */}
      <h1>{book.title}</h1>
      <h2>By {book.author}</h2>
      <div>
        {book.chapters &&
          book.chapters.length > 0 &&
          book.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="mb-4">
              {/* Displaying the chapter title */}
              <h3>{chapter.title}</h3>
              {chapter.sections &&
                chapter.sections.length > 0 &&
                chapter.sections.map((section, sectionIndex) => (
                  <a
                    key={sectionIndex}
                    onClick={() =>
                      router.push(`/book/${bookId}/${chapter.id}/${section.id}`)
                    }
                  >
                    {section.title}
                  </a>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
export default BookRenderer;
