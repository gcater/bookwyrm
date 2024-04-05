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

interface AutoChapterFormUpdateProps {
  chapter: Chapter;
  bookId: string;
}

const MyAutoForm = ({
  bookId,
  chapter,
}: AutoChapterFormUpdateProps): JSX.Element => {
  const { mutate } = api.book.updateChapter.useMutation({
    onSuccess: (data: Chapter) => {
      if (data && "id" in data) {
        // Type guard to ensure 'id' exists in data
        //setChapterId(data.id.toString());
        console.log(data.bookId);
        console.log(data.id);

        chapter = data;
        window.location.reload();
      }
    },
  });

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
            onSubmit={handleSubmit}
          >
            {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
            <Button type="submit">Update Chapter</Button>
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
        {chapter.id && bookId && (
          <CardContent>
            <a
              href={`/book/${bookId}/${chapter.id}/addSection`}
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
