"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import BookRenderer from "~/components/BookRenderer";

import SectionForm from "~/components/SectionForm";
export default function AddSectionPage() {
  const router = useRouter();
  const { bookid, chapterid } = router.query; // `bookid` matches the dynamic segment name

  return (
    <>
      <Head>
        <title>Add Section</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full flex-col items-center gap-2"></div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            <SectionForm
              bookId={bookid as string}
              chapterId={chapterid as string}
            />
          </div>
          <div className="w-1/2">
            <BookRenderer />
          </div>
        </div>
      </main>
    </>
  );
}
