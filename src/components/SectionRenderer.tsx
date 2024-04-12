import React from "react";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const SectionRenderer = ({
  bookId,
  chapterId,
  sectionId,
}: {
  bookId: string;
  chapterId: string;
  sectionId: string;
}) => {
  const router = useRouter(); // This ensures `router` is correctly typed
  const { data: book, isLoading } = api.book.getBook.useQuery(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No book found</div>;

  const chapter = book.chapters.find((chapter) => chapter.id === chapterId);
  if (!chapter) return <div>No chapter found</div>;

  const section = chapter.sections.find((section) => section.id === sectionId);
  if (!section) return <div>No section found</div>;

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
      <ReactMarkdown>{section.content}</ReactMarkdown>
    </div>
  );
};

export default SectionRenderer;
