import { ClerkProvider } from '@clerk/nextjs'

import "@/styles/globals.css";

import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { inter } from "@/lib/fonts";

export const metadata = {
  title: "Holigift",
  description: "Wishlist for every ocassion",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={cn("min-h-[100dvh] font-sans antialiased", inter.variable)}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
