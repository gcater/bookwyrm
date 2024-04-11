"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import BookRenderer from "~/components/BookRenderer";
import SectionForm from "~/components/SectionForm";
import SectionUpdate from "~/components/SectionUpdate";
import { api } from "~/utils/api";

export default function ShowSectionPage() {
  const router = useRouter();
  const bookId = router.query.bookid as string;
  const chapterId = router.query.chapterid as string;

  if (!bookId || !chapterId) return <p>No book or chapter found!</p>;

  const { data: sections, isLoading } = api.book.getSections.useQuery({
    bookId,
    chapterId,
  });

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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full flex-col items-center gap-2"></div>
        </div>
        <div className="w-1/2">
          <BookRenderer bookId={bookId} />
        </div>
      </main>
    </>
  );
}
