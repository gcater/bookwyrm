import React from "react";
import DropDownMenuButton from "./DropDownMenuButton";
import Link from "next/link";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
const BottomBanner = ({
  bookId,
  chapterId,
  sectionId,
}: {
  bookId: string;
  chapterId: string;
  sectionId: string;
}) => {
  const { data: retrievedBook } = api.book.getBook.useQuery(bookId);
  if (!retrievedBook) return <p>No book found!</p>;

  const currentChapterIndex = retrievedBook.chapters.findIndex(
    (chapter) => chapter.id === chapterId,
  );
  const currentChapter = retrievedBook.chapters.find(
    (chapter) => chapter.id === chapterId,
  );
  const currentSectionIndex = currentChapter
    ? currentChapter.sections.findIndex((section) => section.id === sectionId)
    : -1;

  let nextSection = undefined; // Initialize nextSection

  // Check if there's a next section in the current chapter
  if (
    currentSectionIndex <
    (retrievedBook.chapters[currentChapterIndex]?.sections.length ?? 0) - 1
  ) {
    nextSection =
      retrievedBook.chapters[currentChapterIndex]?.sections?.[
        currentSectionIndex + 1
      ] ?? undefined;
  } else if (currentChapterIndex < retrievedBook.chapters.length - 1) {
    // Move to the next chapter's first section if there's no next section in the current chapter
    const nextChapter = retrievedBook.chapters[currentChapterIndex + 1];
    if (nextChapter && nextChapter.sections.length > 0) {
      // Check if nextChapter is defined
      nextSection = nextChapter.sections[0];
    }
  }
  if (!nextSection) return <></>;
  const nextSectionLink = nextSection
    ? `/book/${bookId}/${nextSection.chapterId}/${nextSection.id}`
    : "/";
  return (
    <div className="text-serif flex w-full flex-col pt-4">
      <header className="jusitfy-center flex border-t border-gray-300 bg-white px-4 py-5">
        <div className="w-[50%]">
          <h1 className="Black text-sm font-bold">
            Next Section:{" "}
            <h1 className="text-xs text-gray-500">{nextSection.title}</h1>
          </h1>
        </div>

        <div className="flex w-full justify-end">
          <Button className="w-[85px] items-center rounded-3xl">
            <Link className="flex items-center gap-1" href={nextSectionLink}>
              Next
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default BottomBanner;
