"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/utils/api";

interface AutoSectionFormProps {
  bookId: string;
  chapterId: string;
}

const formSchema = z.object({
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

const SectionForm = ({
  bookId,
  chapterId,
}: AutoSectionFormProps): JSX.Element => {
  const {
    mutate,
    data: mutationResult,
    isSuccess,
  } = api.book.addSection.useMutation({
    onSuccess: (responseData) => {
      if (responseData && "id" in responseData) {
        console.log(responseData);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
  function handleSubmit(values: { title: string; content: string }): void {
    mutate({
      section: {
        title: values.title,
        content: values.content,
      },
      bookId,
      chapterId,
    });
  }
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Section Form</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            // Pass the schema to the form
            formSchema={formSchema}
            onSubmit={handleSubmit}
          >
            <Button type="submit">Send now</Button>
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionForm;
