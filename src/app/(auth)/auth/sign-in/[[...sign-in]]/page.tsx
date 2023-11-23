"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page({
  searchParams,
}: {
  searchParams: {
    redirectUrl?: string;
  };
}) {
  return (
    <SignIn
      afterSignUpUrl={searchParams.redirectUrl}
      afterSignInUrl={searchParams.redirectUrl}
    />
  );
}
