"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import SectionBanner from "~/components/SectionBanner";
import SectionRenderer from "~/components/SectionRenderer";
import SectionUpdate from "~/components/SectionUpdate";
import { api } from "~/utils/api";
import React, { useState } from "react";
import BottomBanner from "~/components/BottomBanner";

export default function ShowSectionPage() {
  const router = useRouter();
  const bookId = router.query.bookid as string;
  const chapterId = router.query.chapterid as string;
  const sectionId = router.query.sectionid as string;
  const [isSectionUpdateVisible, setIsSectionUpdateVisible] = useState(true);
  const { data: retrievedBook, isLoading } = api.book.getBook.useQuery(bookId);

  if (!bookId || !chapterId || !sectionId)
    return <p>No book or chapter or section found!</p>;

  const chapters =
    retrievedBook && Array.isArray(retrievedBook.chapters)
      ? retrievedBook.chapters
      : [];
  const chapter = chapters.find((c) => c.id === chapterId);
  const sections = chapter?.sections ?? [];
  if (!retrievedBook) return <p>No book found!</p>;
  if (!chapter) return <p>No chapter found!</p>;
  if (isLoading) return <p>Loading sections...</p>;
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return <p>No section found!</p>;

  const toggleSectionUpdateVisibility = () => {
    setIsSectionUpdateVisible(!isSectionUpdateVisible);
  };
  return (
    <>
      <Head>
        <title>Edit Sections</title>
        <meta
          name="description"
          content="Edit sections of your book chapter."
        />
      </Head>
      <SectionBanner
        bookId={bookId}
        chapterId={chapterId}
        sectionId={sectionId}
        onToggleUpdate={toggleSectionUpdateVisibility}
      />
      <main className="min-h-screen flex-col pt-32">
        <div className="flex">
          {isSectionUpdateVisible && (
            <div className="w-1/2">
              <SectionUpdate
                key={section.id}
                bookId={bookId}
                chapterId={chapterId}
                initialTitle={section.title}
                sectionId={section.id}
                initialContent={section.content}
              />
            </div>
          )}
          <div className={isSectionUpdateVisible ? "w-1/2" : "w-full px-64"}>
            <SectionRenderer
              bookId={bookId}
              chapterId={chapterId}
              sectionId={sectionId}
            />
          </div>
        </div>
        <BottomBanner
          bookId={bookId}
          chapterId={chapterId}
          sectionId={sectionId}
        />
      </main>
    </>
  );
}
