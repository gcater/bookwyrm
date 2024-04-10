"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BookInputSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),

  author: z
    .string({
      required_error: "Author is required.",
    })
    .min(2, {
      message: "Author must be at least 2 characters.",
    }),
});

const BookForm = (): JSX.Element => {
  const { mutate: createBook } = api.book.createBook.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setBookId(data.id);
    },
  });
  const { mutate: deleteBook } = api.book.deleteBook.useMutation({
    onSuccess: () => {
      setBookId(null);
      window.location.href = "/";
    },
  });

  const [bookId, setBookId] = useState<string | null>(null); // State to store the book ID

  const handleCreate = async ({
    title,
    author,
  }: {
    title: string;
    author: string;
  }) => {
    createBook({ title, author });
  };

  const handleDelete = async (bookId: string) => {
    deleteBook({ bookId });
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Form</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            formSchema={BookInputSchema}
            fieldConfig={{}}
            onSubmit={handleCreate}
          >
            <Button type="submit">Create Book</Button>
          </AutoForm>
        </CardContent>
        {bookId && (
          <>
            <CardContent>
              <Button>
                <a href={`/book/${bookId}/addChapter`}>Add Chapter</a>
              </Button>
            </CardContent>
            <CardContent>
              <Popover>
                <PopoverTrigger>
                  <Button>Delete Book</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Button onClick={() => handleDelete(bookId)}>
                    Confirm Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default BookForm;
