import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
