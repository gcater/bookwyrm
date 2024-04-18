import React from "react";
import DropDownBookButton from "./DropDownBookButton";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { api } from "~/utils/api";

const ProgressBar = ({ bookId, sectionId }: { bookId: string; sectionId: string }) => {
  const { data: retrievedBook } = api.book.getBook.useQuery(bookId);

  if (!retrievedBook) return <p>No book found!</p>;

  // Assuming retrievedBook has a structure like { chapters: [{ id: string, sections: [{ id: string }] }] }
  const calculateProgress = (chapterIndex: number) => {
    if (chapterIndex >= retrievedBook.chapters.length) return 0; // Ensure chapterIndex is within bounds
    const currentChapter = retrievedBook.chapters[chapterIndex];
    if (!currentChapter || currentChapter.sections.length === 0) return 0; // Handle undefined currentChapter or chapters with no sections

    const sectionIndex = currentChapter.sections.findIndex(section => section.id === sectionId);
    // If the current chapter is past, return 100%
    if (chapterIndex < retrievedBook.chapters.findIndex(chapter => chapter.sections.some(section => section.id === sectionId))) {
      return 100;
    }
    // Calculate progress based on the section index
    return sectionIndex >= 0 ? (sectionIndex + 1) / currentChapter.sections.length * 100 : 0;
  };

  const totalSections = retrievedBook.chapters.reduce((acc, chapter) => acc + chapter.sections.length, 0);

  return (
    <div className="flex gap-2 max-w-[700px] mx-auto pb-3 mt-[-15px]">
       {retrievedBook.chapters.map((chapter, index) => {
        if (chapter.sections.length === 0) return null; // Skip chapters with no sections
        const chapterWidth = (chapter.sections.length / totalSections) * 100;
        return (
          <div key={chapter.id} className="flex justify-center relative" style={{ width: `${chapterWidth}%` }}>
              <Progress  className= "h-1" value={calculateProgress(index)} max={100} />
          </div> 
        );
       })} 
    </div>
  );
};

export default ProgressBar;