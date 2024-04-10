"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import BookRenderer from "~/components/BookRenderer";

import SectionForm from "~/components/SectionForm";
export default function AddSectionPage() {
  const router = useRouter();
  const bookId = router.query.bookid as string;
  const chapterId = router.query.chapterid as string;

  if (!bookId || !chapterId) return <p>No book or chapter found!</p>;

  return (
    <>
      <Head>
        <title>Add Section</title>
        <meta
          name="description"
          content="Add a new section to your book chapter."
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full flex-col items-center gap-2"></div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            <SectionForm bookId={bookId} chapterId={chapterId} />
          </div>
          <div className="w-1/2">
            <BookRenderer />
          </div>
        </div>
      </main>
    </>
  );
}
