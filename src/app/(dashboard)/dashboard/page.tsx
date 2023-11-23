import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSettings from "@/components/user-settings";
import UserWishlist from "@/components/user-wishlist";

export default async function Page() {
  const user = await api.user.me.query();

  if (!user) {
    return redirect("/auth/sign-up");
  }

  if (!user.isOnboarded) {
    return redirect("/onboarding");
  }

  const wishlistItems = await api.wishlistItem.getAll.query();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Tabs
        defaultValue="wishlist-items"
        className="flex w-full flex-col items-center"
      >
        <TabsList className="w-max">
          <TabsTrigger value="wishlist-items">Wishlist</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="wishlist-items" className="mt-4 w-full">
          <UserWishlist items={wishlistItems} />
        </TabsContent>

        <TabsContent value="settings" className="mt-4 w-full">
          <UserSettings user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
