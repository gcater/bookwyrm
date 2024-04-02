import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export interface Section {
  id?: string;
  title: string;
  content: string;
}

export interface Chapter {
  id?: string;
  title: string;
  sections: { title: string; content: string }[];
  bookId?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  chapters?: Chapter[];
}

export const bookRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        author: z.string().min(1, "Author is required"),
        chapters: z.array(
          z.object({
            title: z.string().min(1, "Chapter title is required"),
            sections: z.array(
              z.object({
                title: z.string().min(1, "Section title is required"),
                content: z.string().min(1, "Section content is required"),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Simulate a slow db call if necessary
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create the book with chapters and sections
      const book = await ctx.db.book.create({
        data: {
          title: input.title,
          author: input.author,
          createdBy: { connect: { id: ctx.session.user.id } },
          chapters: {
            create: input.chapters.map((chapter: Chapter) => ({
              title: chapter.title,
              sections: {
                create: chapter.sections,
              },
            })),
          },
        },
        include: {
          chapters: {
            include: {
              sections: true,
            },
          },
        },
      });

      return book;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Fetch all books created by the current user, including their chapters and sections
    const books = await ctx.db.book.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        chapters: {
          include: {
            sections: true,
          },
        },
      },
    });

    return books;
  }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.book.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        chapters: {
          include: {
            sections: true,
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
          sections: z.array(
            z.object({
              title: z.string().min(1, "Section title is required"),
              content: z.string().min(1, "Section content is required"),
            }),
          ),
        }),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<Chapter> => {
      // First, ensure the book exists
      const bookExists = await ctx.db.book.findUnique({
        where: { id: input.bookId },
      });
      if (!bookExists) {
        throw new Error("Book not found");
      }

      // Then, use the appropriate method to add a chapter to the book
      const updatedBook: Book = await ctx.db.book.update({
        where: { id: input.bookId },
        data: {
          chapters: {
            create: {
              title: input.chapter.title,
              sections: {
                create: input.chapter.sections, // Ensure sections are correctly added
              },
            },
          },
        },
        include: {
          chapters: {
            include: {
              sections: true, // Correctly nest 'sections' within 'chapters'
            },
          },
        },
      });
      const newChapter =
        updatedBook.chapters?.[updatedBook.chapters.length - 1];
      // Return the updated book could this just be a chapter?
      if (!newChapter) {
        throw new Error("Chapter creation failed");
      } else {
        return newChapter;
      }
    }),
});
