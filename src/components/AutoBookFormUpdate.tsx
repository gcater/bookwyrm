"use client";
import AutoForm from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";
import type { Book } from "~/server/api/routers/book";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),

  author: z
    .string({
      required_error: "Author is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .min(2, {
      message: "Author must be at least 2 characters.",
    }),
});

const MyAutoFormUpdate = ({ bookid }: { bookid: string }): JSX.Element => {
  const { data: queryData, refetch: refetchBook } =
    api.book.getBook.useQuery(bookid);
  console.log(queryData);
  const { mutate } = api.book.updateBook.useMutation({
    onSuccess: (data: Book) => {
      console.log(data);
      void refetchBook();
    },
  });
  //   const [bookId, setBookId] = useState<string | null>(null); // State to store the book ID

  const deleteBook = api.book.delete.useMutation({
    onSuccess: () => {
      window.location.href = "http://localhost:3000";
    },
    onError: (error) => {
      console.log(error);
      window.location.href = "http://localhost:3000";
    },
  });
  const handleSubmit = async ({
    title,
    author,
  }: {
    title: string;
    author: string;
  }) => {
    console.log(title, author);
    mutate({ id: bookid, title, author });
    //console.log(data?.id);
  };
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Form</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            // Pass the schema to the form
            formSchema={formSchema}
            // You can add additional config for each field
            // to customize the UI
            values={{ title: queryData?.title, author: queryData?.author }}
            fieldConfig={{
              title: {
                inputProps: {
                  type: "text",
                  defaultValue: queryData?.title,
                },
              },
              author: {
                inputProps: {
                  type: "text",
                  defaultValue: queryData?.author,
                },
              },
            }}
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
            <Button type="submit">Update Book</Button>
            {/* <AutoFormSubmit>Send now</AutoFormSubmit> */}

            {/*
      All children passed to the form will be rendered below the form.
      */}
          </AutoForm>
        </CardContent>
        {bookid && (
          <>
            <CardContent>
              <a href={`/book/${bookid}/addChapter`} className="button-class">
                Add Chapter
              </a>
            </CardContent>
            <CardContent>
              <Button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this book?")
                  ) {
                    deleteBook.mutate(bookid);
                  }
                }}
              >
                Delete Book
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default MyAutoFormUpdate;
