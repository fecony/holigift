import { type WishlistItem } from "@/server/db";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function WishlistItemCard({ item }: { item: WishlistItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md font-medium">{item.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
