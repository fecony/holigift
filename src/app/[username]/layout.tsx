import AppNavbar from "@/components/navbar/app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen w-full flex-col items-center gap-y-6 pb-16 pt-16">
      <AppNavbar />

      <div className="flex w-full max-w-3xl flex-col">{children}</div>
    </div>
  );
}
