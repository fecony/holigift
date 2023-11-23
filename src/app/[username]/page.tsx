import { notFound } from "next/navigation";
import { api } from "@/trpc/server";

type PageProps = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { username } = params;
  const profile = await api.user.getByUsername.query({ username });

  if (!username || !profile) {
    notFound();
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex flex-col gap-y-8">
        <div className="flex w-full items-center justify-between">
          <h1 className="font-sans text-3xl font-bold md:text-4xl">
            {username}&apos;s Wishlist
          </h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.wishlistItems.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
