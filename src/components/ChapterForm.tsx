"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";

import React, { useState } from "react";
import Link from "next/link";
const ChapterInputSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),
});

interface ChapterFormProps {
  bookId: string;
}

const ChapterForm = ({ bookId }: ChapterFormProps): JSX.Element => {
  const { refetch: refetchBook } = api.book.getBook.useQuery(bookId);

  const { mutate: addChapterMutation } = api.book.addChapter.useMutation({
    onSuccess: (data) => {
      if (data && "id" in data) {
        setChapterId(data.id ?? null);
      }
      void refetchBook();
    },
  });
  const [chapterId, setChapterId] = useState<string | null>(null); // State to store the book ID

  const handleSubmit = async ({ title }: { title: string }) => {
    addChapterMutation({
      chapter: {
        title,
      },
      bookId,
    });
  };
  return (
    <div className="pl-6">
      <Card>
        <CardHeader>
          <CardTitle>Chapter Form</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm formSchema={ChapterInputSchema} onSubmit={handleSubmit}>
            <Button type="submit">Create Chapter</Button>
          </AutoForm>
        </CardContent>
        {chapterId && bookId && (
          <CardContent>
            <Link
              href={`/book/${bookId}/${chapterId}/addSection`}
              className="button-class"
            >
              Add Section
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChapterForm;
