import AppNavbar from "@/components/navbar/app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-screen-sm items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <AppNavbar />

        {children}
      </div>
    </div>
  );
}
