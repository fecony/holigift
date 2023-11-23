import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError, type inferAsyncReturnType } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    auth: auth(),
    ...opts,
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: {
        ...ctx.auth,
        userId: ctx.auth.userId,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
