"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { DependencyType } from "./ui/auto-form/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { Section } from "~/server/api/routers/book";

interface AutoSectionFormUpdateProps {
  bookId: string;
  chapterId: string;
  section: Section;
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
  section,
}: AutoSectionFormUpdateProps): JSX.Element => {
  const { mutate, data, isSuccess } = api.book.updateSection.useMutation({
    onSuccess: (data: Section) => {
      if (data && "id" in data) {
        window.location.reload();
      }
    },
  });
  if (typeof section?.id === "undefined") {
    throw new Error("Section ID is undefined");
  }
  function handleSubmit(values: { title: string; content: string }): void {
    mutate({
      section: {
        title: values.title,
        content: values.content,
      },
      bookId,
      chapterId,
      sectionId: section?.id ?? "",
    });
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
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
