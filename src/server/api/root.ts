import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { wishlistItemRouter } from "@/server/api/routers/wishlistItem";
import { clerkRouter } from "@/server/api/routers/clerk";

export const appRouter = createTRPCRouter({
  user: userRouter,
  clerk: clerkRouter,
  wishlistItem: wishlistItemRouter,
});

export type AppRouter = typeof appRouter;
