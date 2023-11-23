import { IconLoader2, IconStarFilled } from "@tabler/icons-react";
import { Button, type ButtonProps } from "@/components/ui/button";

export default function MakeAWishButton({
  isLoading = false,
  ...props
}: { isLoading?: boolean } & ButtonProps) {
  return (
    <Button variant="outline" {...props}>
      Make a wish
      {isLoading ? (
        <IconLoader2 size={16} className="ml-2 animate-spin" />
      ) : (
        <IconStarFilled size={16} className="ml-2 rotate-12 text-yellow-400" />
      )}
    </Button>
  );
}
