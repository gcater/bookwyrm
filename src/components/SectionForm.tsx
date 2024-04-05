import AutoSectionForm from "./AutoSectionForm";
import AutoSectionFormUpdate from "./AutoSectionFormUpdate";

import { api } from "~/utils/api";

const SectionForm = ({
  bookId,
  chapterId,
}: {
  bookId: string;
  chapterId: string;
}) => {
  const { data: queryData } = api.book.getSections.useQuery({
    bookId,
    chapterId,
  });

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
          .map((section) => (
            <AutoSectionFormUpdate
              key={section.id}
              bookId={bookId}
              chapterId={chapterId}
              section={section}
            />
          ))}
        <AutoSectionForm bookId={bookId} chapterId={chapterId} />
      </div>
    </div>
  );
};

export default SectionForm;
