import React from "react";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import BottomBanner from "./BottomBanner";

const SectionRenderer = ({
  bookId,
  chapterId,
  sectionId,
}: {
  bookId: string;
  chapterId: string;
  sectionId: string;
}) => {
  const { data: book, isLoading } = api.book.getBook.useQuery(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>No book found</div>;

  const chapter = book.chapters.find((chapter) => chapter.id === chapterId);
  if (!chapter) return <div>No chapter found</div>;

  const section = chapter.sections.find((section) => section.id === sectionId);
  if (!section) return <div>No section found</div>;

  return (
    <div>
      <ReactMarkdown>{section.content}</ReactMarkdown>
      <BottomBanner
        bookId={bookId}
        chapterId={chapterId}
        sectionId={sectionId}
      />
    </div>
  );
};

export default SectionRenderer;
