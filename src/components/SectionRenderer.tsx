import React from "react";
import ReactMarkdown from "react-markdown"; // Uncomment this
import { api } from "~/utils/api";
// Assuming Example is not used for Markdown rendering, so it can remain commented out
// import Example from "./example.mdx";

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
  // console.log(section.content);
  // Adjusted for newlines in ReactMarkdown
  const stringWithLineBreaks =
    "dslkajflaskjdf\n\nasdflaksjdflasd\nasdf;oasdf\nthis is the string.";

  const formattedString = stringWithLineBreaks.split("\n").join("  \n");

  // Then use formattedString with ReactMarkdown
  <ReactMarkdown>{formattedString}</ReactMarkdown>;
  console.log(formattedString);
  return <ReactMarkdown className="foo">{section.content}</ReactMarkdown>;
};

export default SectionRenderer;
