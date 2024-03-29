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

const BookForm = (): JSX.Element => {
  const { control, handleSubmit, register, setValue, getValues } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      chapters: [],
    },
  });
  const { mutate: createBook } = api.book.create.useMutation();

  // Define a type for a chapter if not already defined
  type Chapter = z.infer<typeof formSchema>["chapters"][number];

  const addChapter = () => {
    const currentChapters = getValues("chapters");
    const newChapter: Chapter = { title: "", sections: [] }; // Explicitly type the newChapter
    setValue("chapters", [...currentChapters, newChapter]);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    createBook(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("author")} placeholder="Author" />
      <input {...register("title")} placeholder="Book Title" />
      {getValues("chapters").map((chapter, index) => (
        <ChapterComponent key={index} chapterIndex={index} control={control} />
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
