"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

interface SectionUpdateProps {
  bookId: string;
  chapterId: string;
  sectionId: string;
  initialTitle: string;
  initialContent: string;
}

const SectionInputSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),

  content: z.string({
    required_error: "Content is required.",
  }),
});

export const SectionUpdateSchema = z.object({
  section: SectionInputSchema,
  bookId: z.string(),
  chapterId: z.string(),
  sectionId: z.string(),
});

const SectionUpdate = ({
  bookId,
  chapterId,
  sectionId,
  initialTitle,
  initialContent,
}: SectionUpdateProps): JSX.Element => {
  const { refetch: refetchBook } = api.book.getBook.useQuery(bookId);
  const { refetch: refetchChapters } = api.book.getChapters.useQuery(bookId);
  const { refetch: refetchSections } = api.book.getSections.useQuery({
    bookId,
    chapterId,
  });
  const { mutate: updateSection } = api.book.updateSection.useMutation({
    onSuccess: (responseData) => {
      if (responseData && "id" in responseData) {
        void refetchBook();
        void refetchChapters();
        void refetchSections();
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutate: deleteSection } = api.book.deleteSection.useMutation({
    onSuccess: (responseData) => {
      if (responseData && "id" in responseData) {
        void refetchBook();
        void refetchChapters();
        void refetchSections();
      }
    },
  });
  function handleSubmit(values: z.infer<typeof SectionInputSchema>): void {
    updateSection({
      section: values,
      bookId,
      chapterId,
      sectionId,
    });
  }
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Section update</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            // Pass the schema to the form
            formSchema={SectionInputSchema}
            values={{ title: initialTitle, content: initialContent }}
            onSubmit={handleSubmit}
          >
            <Button type="submit">Send now</Button>
          </AutoForm>
        </CardContent>
        <CardContent>
          <Popover>
            <PopoverTrigger>
              <Button>Delete Section</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                onClick={() => deleteSection({ bookId, chapterId, sectionId })}
              >
                Confirm Delete
              </Button>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionUpdate;
