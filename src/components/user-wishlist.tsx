import { type WishlistItem } from "@/server/db";
import MakeAWishButton from "@/components/make-a-wish-button";
import CreateWishlistItem from "@/components/modals/create-wishlist-item";
import WishlistItemCard from "@/components/wishlist-item-card";

export default async function UserWishlist({
  items,
}: {
  items: WishlistItem[];
}) {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-sans text-3xl font-bold md:text-4xl">Wishlist</h1>

        <CreateWishlistItem>
          <MakeAWishButton />
        </CreateWishlistItem>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-muted-foreground text-sm">
            You haven&apos;t wished anything yet.
          </p>
        </div>
      )}
    </div>
  );
}
