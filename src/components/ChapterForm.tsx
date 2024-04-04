import React, { useState } from "react";
import AutoChapterForm from "./AutoChapterForm";
import AutoChapterFormUpdate from "./AutoChapterFormUpdate";
import type { Chapter } from "~/server/api/routers/book";
import { api } from "~/utils/api";

const ChapterForm = ({ bookId }: { bookId: string }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const addChapter = (newChapter: Chapter) => {
    setChapters([...chapters, newChapter]);
  };

  const { data: queryData } = api.book.getChapters.useQuery(bookId);
  return (
    <div>
      {/* Pass addChapter to AutoChapterForm so it can add a new chapter */}

      <div>
        {/* This could be a table or any layout you prefer */}
        {queryData?.map((chapter) => (
          <AutoChapterFormUpdate
            key={chapter.id}
            chapter={chapter}
            bookId={bookId}
          />
        ))}
        <AutoChapterForm bookId={bookId} onAddChapter={addChapter} />
      </div>
    </div>
  );
};

export default ChapterForm;
