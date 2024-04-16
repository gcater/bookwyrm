"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import BookRenderer from "~/components/BookRenderer";
import ChapterForm from "~/components/ChapterForm";
import ChapterUpdate from "~/components/ChapterUpdate";
import TopBanner from "~/components/TopBanner";
import { api } from "~/utils/api";

export default function AddChapterPage() {
  const router = useRouter();
  const bookId = router.query.bookid as string;
  if (!bookId) return <p>No book found!</p>;

  const { data: retrievedBook, isLoading } = api.book.getBook.useQuery(bookId);
  const chapters =
    retrievedBook && Array.isArray(retrievedBook.chapters)
      ? retrievedBook.chapters
      : [];
  if (isLoading) return <p>Loading chapters...</p>;
  if (!retrievedBook) return <p>No book found!</p>;

  return (
    <>
      <Head>
        <title>Edit Chapters</title>
        <meta name="description" content="Edit chapters of your book." />
      </Head>
      <TopBanner />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full flex-col items-center gap-2"></div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            {chapters.map((chapter) => (
              <ChapterUpdate
                key={chapter.id}
                bookId={bookId}
                initialTitle={chapter.title}
                chapterId={chapter.id}
              />
            ))}
            <ChapterForm bookId={bookId} />
          </div>

          <div className="w-1/2">
            <BookRenderer bookId={bookId} />
          </div>
        </div>
      </main>
    </>
  );
}
