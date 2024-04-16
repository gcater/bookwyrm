import React from "react";
import { api } from "~/utils/api";

// import { useRouter } from "next/router";
import Link from "next/link";

const BookRenderer = ({ bookId }: { bookId: string }) => {
  const { data: book, isLoading } = api.book.getBook.useQuery(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No books found</div>;

  return (
    <div className="mx-auto flex max-w-md flex-col font-serif">
      {/* Displaying the book name and author name together */}
      {/* <h3>
        {book.title} - By {book.author}
      </h3> */}
      <div className="text-gray-700">
        <h5>
          <strong>Description</strong>
        </h5>
        <p>
          Technology has enabled us to start new companies, new communities, and
          new currencies. But can we use it to start new cities, or even new
          countries? This book explains how to build the successor to the nation
          state, a concept we call the network state.
        </p>
        <div className="my-4"></div>
        <div className="border-t border-gray-300" />
        <div className="my-4"></div>
      </div>

      <div>
        {book.chapters &&
          book.chapters.length > 0 &&
          book.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="mb-4">
              <Link
                href={`/book/${bookId}/${chapter.id}/${chapter?.sections?.[0]?.id}`}
              >
                <h3>{`${chapterIndex + 1}. ${chapter.title}`}</h3>
              </Link>
              {chapter.sections && chapter.sections.length > 0 && (
                <div className="border-t-rounded border-b-rounded flex flex-col rounded-xl border border-gray-300">
                  {chapter.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className={"border-b border-gray-300 last:border-b-0 "}
                    >
                      <div className="rounded-xl hover:bg-gray-50">
                        <Link
                          href={`/book/${bookId}/${chapter.id}/${section.id}`}
                          className="cursor-pointer text-black"
                        >
                          <div className=" py-2">
                            {/* Wrap the Link in a div with padding for the text only */}

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
  );
};
export default BookRenderer;
