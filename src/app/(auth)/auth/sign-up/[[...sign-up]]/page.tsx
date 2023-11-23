"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page({
  searchParams,
}: {
  searchParams: {
    redirectUrl?: string;
  };
}) {
  return (
    <SignUp
      afterSignUpUrl={searchParams.redirectUrl}
      afterSignInUrl={searchParams.redirectUrl}
    />
  );
}
