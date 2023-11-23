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
    <div className="h-full w-full max-w-3xl">
      <div className="flex flex-col gap-y-6">
        {profile.wishlistItems.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}
