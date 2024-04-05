"use client";

import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";
import React, { useState } from "react"; // Import useState
import type { Chapter } from "~/server/api/routers/book";
import AutoForm from "./ui/auto-form";

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

interface AutoChapterFormProps {
  bookId: string;
}

const MyAutoForm = ({ bookId }: AutoChapterFormProps): JSX.Element => {
  const { mutate, data, isSuccess } = api.book.addChapter.useMutation({
    onSuccess: (data: Chapter) => {
      if (data && "id" in data) {
        // Type guard to ensure 'id' exists in data
        //setChapterId(data.id.toString());
        console.log(data.bookId);
        console.log(data.id);
        setChapterId(data.id ?? null);
        window.location.reload();
      }
    },
  });
  const [chapterId, setChapterId] = useState<string | null>(null); // State to store the book ID

  const handleSubmit = async ({ title }: { title: string }) => {
    console.log(title);
    // Adjust the object to match the expected shape
    mutate({
      chapter: {
        title, // Assuming this is the chapter title
        sections: [], // Assuming sections can be an empty array for now
      },
      bookId,
      //bookId: parseInt(bookId, 10), // Convert bookId from string to number, ensure bookId is not null before this operation
    });
  };
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Chapter</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            // Pass the schema to the form
            formSchema={formSchema}
            // You can add additional config for each field
            // to customize the UI
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
            <Button type="submit">Add Chapter</Button>
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
