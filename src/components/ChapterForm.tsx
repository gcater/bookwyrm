import AutoChapterForm from "./AutoChapterForm";
import AutoChapterFormUpdate from "./AutoChapterFormUpdate";
import { api } from "~/utils/api";

const ChapterForm = ({ bookId }: { bookId: string }) => {
  const { data: queryData } = api.book.getChapters.useQuery(bookId);
  console.log(queryData);
  return (
    <div>
      {/* Pass addChapter to AutoChapterForm so it can add a new chapter */}

      <div>
        {/* This could be a table or any layout you prefer */}
        {queryData
          ?.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((chapter) => (
            <AutoChapterFormUpdate
              key={chapter.id}
              chapter={chapter}
              bookId={bookId}
            />
          ))}
        <AutoChapterForm bookId={bookId} />
      </div>
    </div>
  );
};

export default ChapterForm;
