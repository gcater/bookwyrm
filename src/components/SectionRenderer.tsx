import React from "react";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import Example from "./example.mdx";
import Markdown from "react-markdown";

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
  return <Markdown className="markdown w-full">{section.content}</Markdown>;
};
export default SectionRenderer;
