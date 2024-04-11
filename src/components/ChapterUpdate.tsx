"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";

import React from "react";
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

interface ChapterUpdateProps {
  bookId: string;
  initialTitle: string;
  chapterId: string;
}

const ChapterUpdate = ({
  bookId,
  initialTitle,
  chapterId,
}: ChapterUpdateProps): JSX.Element => {
  const { refetch: refetchBook } = api.book.getBook.useQuery(bookId);
  const { refetch: refetchChapters } = api.book.getChapters.useQuery(bookId);

  const { mutate: updateChapter } = api.book.updateChapter.useMutation({
    onSuccess: () => {
      void refetchBook();
      void refetchChapters();
    },
  });

  const handleUpdate = async ({ title }: { title: string }) => {
    updateChapter({
      title,
      id: chapterId,
      bookId: bookId,
    });
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Chapter Form</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            formSchema={ChapterInputSchema}
            values={{ title: initialTitle }}
            onSubmit={handleUpdate}
          >
            <Button type="submit">Update Chapter</Button>
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

export default ChapterUpdate;
