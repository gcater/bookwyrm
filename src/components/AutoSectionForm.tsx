"use client";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import type { Section } from "~/server/api/routers/book";
import AutoForm from "./ui/auto-form";

interface AutoSectionFormProps {
  bookId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),

  content: z.string({
    required_error: "Content is required.",
  }),
});

const MyAutoForm = ({
  bookId,
  chapterId,
}: AutoSectionFormProps): JSX.Element => {
  const { mutate } = api.book.addSection.useMutation({
    onSuccess: (data: Section) => {
      if (data && "id" in data) {
        window.location.reload();
      }
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
            {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
            <Button type="submit">Add Section</Button>

            {/*
      All children passed to the form will be rendered below the form.
      */}
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAutoForm;
