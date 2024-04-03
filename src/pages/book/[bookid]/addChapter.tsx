"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import BookForm from "@/components/BookForm";
import BookRender from "@/components/BookRender";
import AutoBookForm from "~/components/AutoBookForm";
import AutoChapterForm from "~/components/AutoChapterForm";

export default function AddChapterPage() {
  const router = useRouter();
  const { bookid } = router.query; // `bookid` matches the dynamic segment name
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex w-full flex-col items-center gap-2"></div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            <AutoChapterForm bookId={bookid as string} />
          </div>
          <div className="w-1/2">
            <BookRender bookid={bookid as string} />
          </div>
        </div>
      </main>
    </>
  );
}