import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api", "/api/(.*)", "/:user", "/:user/:list"],
  afterAuth: (auth, req) => {
    if (
      !auth.userId &&
      ["/dashboard", "/onboarding"].includes(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(
        new URL("/auth/sign-up", req.nextUrl.origin),
      );
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
