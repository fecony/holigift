import { type inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";
import {
  getAuth,
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/nextjs/server";

import { db } from "@/server/db";

interface CreateContextOptions {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
  req: NextRequest;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => ({
  ...opts,
  db,
});

export const createTRPCContext = (opts: { req: NextRequest }) => {
  const auth = getAuth(opts.req);

  return createInnerTRPCContext({
    auth,
    req: opts.req,
  });
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

export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
