"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/utils/api";

interface SectionFormProps {
  bookId: string;
  chapterId: string;
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

export const SectionFormSchema = z.object({
  section: SectionInputSchema,
  bookId: z.string(),
  chapterId: z.string(),
});

const SectionForm = ({ bookId, chapterId }: SectionFormProps): JSX.Element => {
  const { mutate } = api.book.addSection.useMutation({
    onSuccess: (responseData) => {
      if (responseData && "id" in responseData) {
        console.log(responseData);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
  function handleSubmit(values: z.infer<typeof SectionInputSchema>): void {
    mutate({
      section: values,
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
            formSchema={SectionInputSchema}
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
