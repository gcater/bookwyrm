import React from "react";
import { Progress } from "@/components/ui/progress";
import { api } from "~/utils/api";

const ProgressBar = ({ bookId, chapterId,sectionId }: { bookId: string; chapterId: string; sectionId: string }) => {
  const { data: retrievedBook } = api.book.getBook.useQuery(bookId);

  if (!retrievedBook) return <p>No book found!</p>;

  const currentChapterIndex = retrievedBook.chapters.findIndex(chapter => chapter.id === chapterId);
  const currentChapterTitle = retrievedBook.chapters[currentChapterIndex]?.title ?? 'Unknown Chapter';
  const currentChapter = retrievedBook.chapters[currentChapterIndex];
  const currentSectionIndex = currentChapter?.sections.findIndex(section => section.id === sectionId) ?? -1;
  const currentSectionTitle = currentChapter?.sections[currentSectionIndex]?.title ?? 'Unknown Section';

  const calculateProgress = (chapterIndex: number) => {
    if (chapterIndex >= retrievedBook.chapters.length) return 0; // Ensure chapterIndex is within bounds
    const currentChapter = retrievedBook.chapters[chapterIndex];
    if (!currentChapter || currentChapter.sections.length === 0) return 0; // Handle undefined currentChapter or chapters with no sections

    const sectionIndex = currentChapter.sections.findIndex(section => section.id === sectionId);
    if (chapterIndex < retrievedBook.chapters.findIndex(chapter => chapter.sections.some(section => section.id === sectionId))) {
      return 100;
    }
    return sectionIndex >= 0 ? (sectionIndex) / currentChapter.sections.length * 100 : 0;
  };

  const totalSections = retrievedBook.chapters.reduce((acc, chapter) => acc + chapter.sections.length, 0);

  return (
    <div className="font-serif">
      <div className="text-center font-bold text-xs text-black pb-10 mt-[-60px]">{`${currentChapterTitle}`}</div>
      <div className="text-center text-xs text-gray-600 pb-10 mt-[-40px]">{`${currentSectionTitle}`}</div>
      <div className="flex gap-2 max-w-[700px] mx-auto pb-3 mt-[-28px]">
          
         {retrievedBook.chapters.map((chapter, index) => {
          if (chapter.sections.length === 0) return null; 
          const chapterWidth = (chapter.sections.length / totalSections) * 100;
          return (
            <div key={chapter.id} className="flex justify-center relative" style={{ width: `${chapterWidth}%` }}>
                <Progress  className= "h-1 bg-gray-300" value={calculateProgress(index)} max={100} />
            </div> 
          );
         })} 
      </div>
    </div>
  );
};
export default ProgressBar;