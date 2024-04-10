"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";
import React from "react";
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

const BookUpdate = ({ bookId }: { bookId: string }): JSX.Element => {
  const { data: queryData, refetch: refetchBook } =
    api.book.getBook.useQuery(bookId);

  const { mutate: updateBook } = api.book.updateBook.useMutation({
    onSuccess: (data) => {
      console.log(data);
      void refetchBook();
    },
  });
  const { mutate: deleteBook } = api.book.deleteBook.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const handleUpdate = async ({
    title,
    author,
  }: {
    title: string;
    author: string;
  }) => {
    updateBook({ id: bookId, title, author });
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
            values={{ title: queryData?.title, author: queryData?.author }}
            onSubmit={handleUpdate}
          >
            <Button type="submit">Update Book</Button>
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

export default BookUpdate;
