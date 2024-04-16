"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import BookRenderer from "~/components/BookRenderer";
import SectionBanner from "~/components/SectionBanner";
import SectionForm from "~/components/SectionForm";
import SectionUpdate from "~/components/SectionUpdate";
import { api } from "~/utils/api";

export default function AddSectionPage() {
  const router = useRouter();
  const bookId = router.query.bookid as string;
  const chapterId = router.query.chapterid as string;

  if (!bookId || !chapterId) return <p>No book or chapter found!</p>;

  const { data: retrivedBook, isLoading } = api.book.getBook.useQuery(bookId);
  const chapters =
    retrivedBook && Array.isArray(retrivedBook.chapters)
      ? retrivedBook.chapters
      : [];
  const chapter = chapters.find((c) => c.id === chapterId);
  const sections = chapter?.sections ?? [];
  if (!retrivedBook) return <p>No book found!</p>;
  if (!chapter) return <p>No chapter found!</p>;
  if (isLoading) return <p>Loading sections...</p>;

  return (
    <>
      <Head>
        <title>Edit Sections</title>
        <meta
          name="description"
          content="Edit sections of your book chapter."
        />
      </Head>
      <SectionBanner bookId={bookId} />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full flex-col items-center gap-2"></div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            {sections.map((section) => (
              <SectionUpdate
                key={section.id}
                bookId={bookId}
                chapterId={chapterId}
                initialTitle={section.title}
                sectionId={section.id}
                initialContent={section.content}
              />
            ))}
            <SectionForm bookId={bookId} chapterId={chapterId} />
          </div>
          <div className="w-1/2">
            <BookRenderer bookId={bookId} />
          </div>
        </div>
      </main>
    </>
  );
}
