"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import SectionBanner from "~/components/SectionBanner";
// import BookRenderer from "~/components/BookRenderer";
// import SectionForm from "~/components/SectionForm";
import SectionRenderer from "~/components/SectionRenderer";
import SectionUpdate from "~/components/SectionUpdate";
import { api } from "~/utils/api";

export default function ShowSectionPage() {
  const router = useRouter();
  const bookId = router.query.bookid as string;
  const chapterId = router.query.chapterid as string;
  const sectionId = router.query.sectionid as string;

  if (!bookId || !chapterId || !sectionId)
    return <p>No book or chapter or section found!</p>;

  const { data: retrievedBook, isLoading } = api.book.getBook.useQuery(bookId);
  const chapters =
    retrievedBook && Array.isArray(retrievedBook.chapters)
      ? retrievedBook.chapters
      : [];
  const chapter = chapters.find((c) => c.id === chapterId);
  const sections = chapter?.sections ?? [];
  if (!retrievedBook) return <p>No book found!</p>;
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
          </div>
          <div className="w-1/2">
            <SectionRenderer
              bookId={bookId}
              chapterId={chapterId}
              sectionId={sectionId}
            />
          </div>
        </div>
      </main>
    </>
  );
}
