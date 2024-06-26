import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { SectionFormSchema } from "~/components/SectionForm";
import { TRPCError } from "@trpc/server";
import { SectionUpdateSchema } from "~/components/SectionUpdate";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        author: z.string().min(1, "Author is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create the book with chapters and sections
      const book = await ctx.db.book.create({
        data: {
          title: input.title,
          author: input.author,
          createdById: ctx.session.user.id,
        },
      });
      return book;
    }),
  getBook: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      console.log(`Fetching book with ID: ${input}`); // Added console.log for debugging
      const book = await ctx.db.book.findUnique({
        where: { id: input },
        include: {
          chapters: {
            orderBy: {
              createdAt: "asc", // Sort chapters by createdAt in ascending order
            },
            include: {
              sections: {
                orderBy: {
                  createdAt: "asc", // Sort sections by createdAt in ascending order within each chapter
                },
              },
            },
          },
        },
      });
      if (!book) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No book found with id ${input}`,
        });
      }
      return book;
    }),
  updateBook: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedBook = await ctx.db.book.update({
        where: { id: input.id },
        data: { title: input.title, author: input.author },
      });
      return updatedBook;
    }),

  deleteBook: protectedProcedure
    .input(z.object({ bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedBook = await ctx.db.book.delete({
        where: { id: input.bookId },
      });
      return deletedBook;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Fetch all books created by the current user, including their chapters and sections
    const books = await ctx.db.book.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdById: ctx.session.user.id },
      include: {
        chapters: {
          orderBy: {
            createdAt: "asc", // Sort chapters by createdAt in ascending order
          },
          include: {
            sections: {
              orderBy: {
                createdAt: "asc", // Sort sections by createdAt in ascending order within each chapter
              },
            },
          },
        },
      },
    });
    return books;
  }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.book.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdById: ctx.session.user.id },
      include: {
        chapters: {
          orderBy: {
            createdAt: "asc", // Sort chapters by createdAt in ascending order
          },
          include: {
            sections: {
              orderBy: {
                createdAt: "asc", // Sort sections by createdAt in ascending order within each chapter
              },
            },
          },
        },
      },
    });
  }),
  addChapter: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        chapter: z.object({
          title: z.string().min(1, "Chapter title is required"),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Attempting to add a chapter to book with ID:", input.bookId); // Added console.log as per instruction
      // First, ensure the book exists
      const bookExists = await ctx.db.book.findUnique({
        where: { id: input.bookId },
      });
      if (!bookExists) {
        throw new Error("Book not found");
      }

      // Then, use the appropriate method to add a chapter to the book
      const updatedBook = await ctx.db.book.update({
        where: { id: input.bookId },
        data: {
          chapters: {
            create: {
              title: input.chapter.title,
            },
          },
        },
        include: {
          chapters: {},
        },
      });
      const newChapter =
        updatedBook.chapters?.[updatedBook.chapters.length - 1];
      if (!newChapter) {
        throw new Error("Chapter creation failed");
      } else {
        return newChapter;
      }
    }),
  updateChapter: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        bookId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // First, check if the chapter exists
      const chapterExists = await ctx.db.chapter.findUnique({
        where: { id: input.id },
      });
      if (!chapterExists) {
        throw new Error("Chapter not found");
      }

      // Then, proceed to update the chapter
      try {
        const updatedChapter = await ctx.db.chapter.update({
          where: { id: input.id },
          data: {
            title: input.title,
          },
        });
        return updatedChapter;
      } catch (error) {
        throw new Error("Failed to update chapter");
      }
    }),

  // mutation to add a section to a chapter in a book
  addSection: protectedProcedure
    .input(SectionFormSchema)
    .mutation(async ({ ctx, input }) => {
      // First, ensure the chapter exists within the book
      const chapterExists = await ctx.db.chapter.findFirst({
        where: {
          id: input.chapterId,
          bookId: input.bookId,
        },
      });
      if (!chapterExists) {
        throw new Error("Chapter not found in the specified book");
      }

      // Then, add the new section to the chapter
      const newSection = await ctx.db.section.create({
        data: {
          title: input.section.title,
          content: input.section.content,
          chapterId: input.chapterId,
        },
      });

      if (!newSection) {
        throw new Error("Section creation failed");
      } else {
        return newSection;
      }
    }),

  updateSection: protectedProcedure
    .input(SectionUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      // First, ensure the section exists
      const sectionExists = await ctx.db.section.findUnique({
        where: { id: input.sectionId },
      });
      if (!sectionExists) {
        throw new Error("Section not found");
      }

      // Then, update the section with new data
      const updatedSection = await ctx.db.section.update({
        where: { id: input.sectionId },
        data: {
          title: input.section.title,
          content: input.section.content,
        },
      });

      return updatedSection;
    }),

  deleteChapter: protectedProcedure
    .input(z.object({ bookId: z.string(), chapterId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if the book exists
      const bookExists = await ctx.db.book.findUnique({
        where: { id: input.bookId },
      });
      if (!bookExists) {
        throw new Error("Book not found");
      }

      // Check if the chapter exists within the book
      const chapterExists = await ctx.db.chapter.findFirst({
        where: {
          id: input.chapterId,
          bookId: input.bookId,
        },
      });
      if (!chapterExists) {
        throw new Error("Chapter not found in the specified book");
      }
      const deletedChapter = await ctx.db.chapter.delete({
        where: { id: input.chapterId },
      });
      return deletedChapter;
    }),

  deleteSection: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        chapterId: z.string(),
        sectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the book exists
      const bookExists = await ctx.db.book.findUnique({
        where: { id: input.bookId },
      });
      if (!bookExists) {
        throw new Error("Book not found");
      }

      // Check if the chapter exists within the book
      const chapterExists = await ctx.db.chapter.findFirst({
        where: {
          id: input.chapterId,
          bookId: input.bookId,
        },
      });
      if (!chapterExists) {
        throw new Error("Chapter not found in the specified book");
      }

      // Check if the section exists
      const sectionExists = await ctx.db.section.findUnique({
        where: { id: input.sectionId },
      });
      if (!sectionExists) {
        throw new Error("Section not found in the specified chapter");
      }

      // Delete the section
      const deletedSection = await ctx.db.section.delete({
        where: { id: input.sectionId },
      });
      return deletedSection;
    }),
});
