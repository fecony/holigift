"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { type z } from "zod";
import AutoForm from "@/components/ui/auto-form";
import { CreateWishlistSchema } from "@/server/api/schema/wishlist";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { IconLoader2, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CreateWishlistForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<
    Partial<z.infer<typeof CreateWishlistSchema>>
  >({});

  const trpcUtils = api.useUtils();
  const { mutateAsync: createWishlistItem, isLoading } =
    api.wishlistItem.create.useMutation({
      onSuccess: () => {
        toast("Wish is saved", {
          icon: <IconStar size={20} className="mr-2 text-yellow-500" />,
        });
        void trpcUtils.wishlistItem.getAll.invalidate();
        void router.refresh();
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);

        toast.error("Error", {
          description: "Something went wrong",
        });
      },
    });

  return (
    <AutoForm
      className="flex flex-col justify-end"
      onSubmit={createWishlistItem}
      formSchema={CreateWishlistSchema}
      values={values}
      onParsedValuesChange={setValues}
      fieldConfig={{
        url: {
          description: "A link to wish where it can be obtained",
        },
        imageUrl: {
          inputProps: {
            placeholder: "A link to image",
          },
          description: "Will be displayed in your listing",
        },
        notes: {
          fieldType: "textarea",
          description:
            "Notes can help other people to understand the context of your wish",
        },
        isPublic: {
          fieldType: "switch",
          description: "You can change this later",
        },
      }}
    >
      <div className="flex gap-x-4">
        {isLoading ? (
          <Button disabled className="w-full">
            <IconLoader2 size={24} className="ml-2 animate-spin" />
          </Button>
        ) : (
          <>
            <Button type="submit" disabled={isLoading} className="w-full">
              Create
            </Button>

            <Button
              type="button"
              disabled={isLoading}
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </>
        )}
      </div>
    </AutoForm>
  );
}
