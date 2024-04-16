import React from "react";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";

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
<<<<<<< HEAD
  // console.log(section.content);
  // Adjusted for newlines in ReactMarkdown
  const stringWithLineBreaks =
    "dslkajflaskjdf\n\nasdflaksjdflasd\nasdf;oasdf\nthis is the string.";

  const formattedString = stringWithLineBreaks.split("\n").join("  \n");

  // Then use formattedString with ReactMarkdown
  <ReactMarkdown>{formattedString}</ReactMarkdown>;
  console.log(formattedString);
  return <ReactMarkdown className="foo">{section.content}</ReactMarkdown>;
=======
  return <ReactMarkdown>{section.content}</ReactMarkdown>;
>>>>>>> 736e743 (got git to recognize renaming of BookRenderer, vercel should work now. Also working on taking out unecessary comments)
};

export default SectionRenderer;
