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
          title: z.string().min(1, "Section title must be at least 1 character."),
          content: z.string().min(1, "Section content must be at least 1 character."),
        })
      ),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
          {ShadForm()}
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

export function ShadForm() {
  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      chapters: [],
    },
  });
  const { mutate: createBook } = api.book.create.useMutation();
  const { fields: chapterFields, append: appendChapter } = useFieldArray<FormValues["chapters"][number]>({
    control,
    name: "chapters",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    createBook(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("author")} placeholder="Author" />
      <input {...register("title")} placeholder="Book Title" />
      {chapterFields.map((chapter, index) => (
        <ChapterComponent key={chapter.id} chapterIndex={index} control={control} />
      ))}
      <button type="button" onClick={() => appendChapter({ title: "", sections: [] })}>
        Add Chapter
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

const ChapterComponent = ({ chapterIndex, control }: { chapterIndex: number; control: Control<FormValues, any> }) => {
  const { fields: sectionFields, append: appendSection } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.sections`,
  });

  return (
    <fieldset>
      <legend>Chapter {chapterIndex + 1}</legend>
      <input {...control.register(`chapters.${chapterIndex}.title`)} placeholder="Chapter Title" />
      {sectionFields.map((section, index) => (
        <SectionComponent key={section.id} chapterIndex={chapterIndex} sectionIndex={index} control={control} />
      ))}
      <button type="button" onClick={() => appendSection({ title: "", content: "" })}>
        Add Section
      </button>
    </fieldset>
  );
};

const SectionComponent = ({ chapterIndex, sectionIndex, control }: { chapterIndex: number; sectionIndex: number; control: Control<FormValues, any> }) => {
  return (
    <div>
      <input {...control.register(`chapters.${chapterIndex}.sections.${sectionIndex}.title`)} placeholder="Section Title" />
      <textarea {...control.register(`chapters.${chapterIndex}.sections.${sectionIndex}.content`)} placeholder="Section Content" />
    </div>
  );
};
