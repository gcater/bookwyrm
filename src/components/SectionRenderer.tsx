import React from "react";
import ReactMarkdown from "react-markdown"; // Uncomment this
import { api } from "~/utils/api";
import { useRouter } from "next/router";
// Assuming Example is not used for Markdown rendering, so it can remain commented out
// import Example from "./example.mdx";
import Link from "next/link";

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

  // Use ReactMarkdown to render the Markdown content
  return <ReactMarkdown>{section.content}</ReactMarkdown>;
};

export default SectionRenderer;
