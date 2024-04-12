import React from "react";
// import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Example from "./example.mdx";
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
  console.log(Example);
  return (
    <div>
      <div>
        <h1>This is a markdown file</h1>
        <p>
          <strong>bold</strong>
        </p>
        <p>
          <em>italic</em>
        </p>
        {/* Assuming /n was meant to be a line break or new paragraph */}
        <p></p> {/* For a new paragraph, or use <br /> for a line break */}
        <h6>It is using a custom link component</h6>
        <p>hello</p>
        {/* Assuming "===============" is meant to underline or separate content */}
        <hr />{" "}
        <blockquote>
          <p>This is a blockquote</p>
          <p>This is a blockquote</p>
          <p>This is a blockquote</p>
        </blockquote>
        {/* <hr /> is used for a thematic break (horizontal rule) in HTML */}
      </div>
      <Example />
    </div>
  );
};

export default SectionRenderer;
