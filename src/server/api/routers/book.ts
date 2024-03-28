import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


interface Chapter {
  title: string;
  sections: { title: string; content: string; }[];
}

export const bookRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        author: z.string().min(1, "Author is required"),
        chapters: z.array(z.object({
          title: z.string().min(1, "Chapter title is required"),
          sections: z.array(z.object({
            title: z.string().min(1, "Section title is required"),
            content: z.string().min(1, "Section content is required"),
          })),
        })),
      })
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
});