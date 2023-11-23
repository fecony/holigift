"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export default function HomeNavbar() {
  const { isSignedIn } = useUser();

  return (
    <Navbar>
      <Link className="ml-auto" href="/dashboard">
        <Button variant="outline">
          {isSignedIn ? "Go to Dashboard" : "Get Started"}
        </Button>
      </Link>
    </Navbar>
  );
}
