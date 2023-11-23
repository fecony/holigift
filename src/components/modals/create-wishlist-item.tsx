"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateWishlistForm from "../form/create-wishlist-form";
import { IconStarFilled } from "@tabler/icons-react";

export default function CreateWishlistItem({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="group flex items-center">
            Make a wish
            <IconStarFilled className="group-hover:animate-wiggle ml-2 rotate-12 text-yellow-400" />
          </DialogTitle>
        </DialogHeader>

        <CreateWishlistForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
