"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import { api } from "~/utils/api";
import { z } from "zod";
import { useForm, useFieldArray, Controller, Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Chapter } from "src/server/api/routers/book";

const formSchema = z.object({
  author: z.string().min(2, "Author must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  chapters: z.array(
    z.object({
      title: z.string().min(1, "Chapter title must be at least 1 character."),
      sections: z.array(
        z.object({
          title: z
            .string()
            .min(1, "Section title must be at least 1 character."),
          content: z
            .string()
            .min(1, "Section content must be at least 1 character."),
        }),
      ),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;
// This will return the book form JSX Element. It will allow a user to type in the author, title, and add chapters. Each chapter will have a title and can have multiple sections. Sections will have a title and text content.
const BookForm = (): JSX.Element => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      chapters: [],
    },
  });
  const mutation = api.book.create.useMutation();
  const { fields: chapters, append: appendChapter } = useFieldArray({
    control,
    name: "chapters",
  });
  ``;
  const addChapter = () => {
    appendChapter({ title: "", sections: [] });
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("author")} placeholder="Author" />
      <input {...register("title")} placeholder="Book Title" />
      {chapters.map((chapter, index) => (
        <ChapterComponent
          key={chapter.id}
          chapterIndex={index}
          control={control}
        />
      ))}
      <button type="button" onClick={addChapter}>
        Add Chapter
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

const ChapterComponent = ({
  chapterIndex,
  control,
}: {
  chapterIndex: number;
  control: Control<FormValues>;
}) => {
  const { fields: sectionFields, append: appendSection } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.sections`,
  });
  return (
    <fieldset>
      <legend>Chapter {chapterIndex + 1}</legend>
      <input
        {...control.register(`chapters.${chapterIndex}.title`)}
        placeholder="Chapter Title"
      />
      {sectionFields.map((section, index) => (
        <SectionComponent
          key={section.id}
          chapterIndex={chapterIndex}
          sectionIndex={index}
          control={control}
        />
      ))}
      <button
        type="button"
        onClick={() => appendSection({ title: "", content: "" })}
      >
        Add Section
      </button>
    </fieldset>
  );
};

const SectionComponent = ({
  chapterIndex,
  sectionIndex,
  control,
}: {
  chapterIndex: number;
  sectionIndex: number;
  control: Control<FormValues>;
}) => {
  return (
    <div>
      <input
        {...control.register(
          `chapters.${chapterIndex}.sections.${sectionIndex}.title`,
        )}
        placeholder="Section Title"
      />
      <textarea
        {...control.register(
          `chapters.${chapterIndex}.sections.${sectionIndex}.content`,
        )}
        placeholder="Section Content"
      />
    </div>
  );
};

export default BookForm;
