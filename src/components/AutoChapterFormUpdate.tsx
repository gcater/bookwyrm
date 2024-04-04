"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { DependencyType } from "./ui/auto-form/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";
import type { Book } from "~/server/api/routers/book";
import React, { useState } from "react"; // Import useState
import type { Chapter } from "~/server/api/routers/book";
import type { Section } from "~/server/api/routers/book";
const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),
});

interface AutoChapterFormUpdateProps {
  chapter: Chapter;
  bookId: string;
}

const MyAutoForm = ({
  bookId,
  chapter,
}: AutoChapterFormUpdateProps): JSX.Element => {
  const { mutate, data, isSuccess } = api.book.updateChapter.useMutation({
    onSuccess: (data: Chapter) => {
      if (data && "id" in data) {
        // Type guard to ensure 'id' exists in data
        //setChapterId(data.id.toString());
        console.log(data.bookId);
        console.log(data.id);
        setChapterId(data.id ?? null);
        chapter = data;
        window.location.reload();
      }
    },
  });
  const [chapterId, setChapterId] = useState<string | null>(null); // State to store the book ID

  const handleSubmit = async ({ title }: { title: string }) => {
    console.log(title);
    // Adjust the object to match the expected shape
    if (typeof chapter.id === "undefined") {
      throw new Error("Chapter ID is undefined");
    }
    mutate({
      id: chapter.id ?? "",
      title, // Directly use title here
      sections: [], // Directly use sections here
      bookId,
    });
  };
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{chapter.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            // Pass the schema to the form
            formSchema={formSchema}
            // You can add additional config for each field
            // to customize the UI
            values={{ title: chapter.title }}
            fieldConfig={{}}
            // Optionally, define dependencies between fields
            // dependencies={[
            //   {
            //     // Hide "color" when "sendMeMails" is not checked as we only need to
            //     // know the color when we send mails
            //     sourceField: "",
            //     type: DependencyType.HIDES,
            //     targetField: "color",
            //     when: (sendMeMails) => !sendMeMails,
            //   },
            // ]}
            onSubmit={handleSubmit}
          >
            {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
            <Button type="submit">Send now</Button>
            {/* <AutoFormSubmit>Send now</AutoFormSubmit> */}

            {/*
      All children passed to the form will be rendered below the form.
      */}
            <p className="text-sm text-gray-500">
              By submitting this form, you agree to our{" "}
              <a href="#" className="text-primary underline">
                terms and conditions
              </a>
              .
            </p>
          </AutoForm>
        </CardContent>
        {chapterId && bookId && (
          <CardContent>
            <a
              href={`/book/${bookId}/${chapterId}/addSection`}
              className="button-class"
            >
              Add Section
            </a>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default MyAutoForm;
