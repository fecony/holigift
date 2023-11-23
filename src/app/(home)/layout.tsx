import HomeNavbar from "@/components/navbar/home";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center py-4 md:py-8">
      <HomeNavbar />

      <div className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center py-20">
        {children}
      </div>

      {/* TODO: add footer material with policy, T&C, contact, docs? and so on */}
    </div>
  );
}
