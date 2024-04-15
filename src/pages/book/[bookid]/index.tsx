"use client";
import Head from "next/head";
import BookRenderer from "~/components/BookRenderer";
import { useRouter } from "next/router";
import BookUpdate from "~/components/BookUpdate";

export default function Home() {
  const router = useRouter();
  const bookid = router.query.bookid as string;
  if (!bookid) {
    return <div>Book not found</div>;
  }
  return (
    <>
      <Head>
        <title>BookWyrm</title>
        <meta name="description" content="BookWyrm - update your book" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex w-full">
          <div className="w-1/2">{BookUpdate({ bookId: bookid })}</div>
          <div className="w-1/2">{BookRenderer({ bookId: bookid })}</div>
        </div>
      </main>
    </>
  );
}
