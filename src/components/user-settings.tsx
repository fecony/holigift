import { type User } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertTriangle } from "@tabler/icons-react";

export default async function UserSettings({ user }: { user: User }) {
  const clerk = await currentUser();

  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">Settings</h1>

      <div className="border-border bg-background flex flex-col gap-y-6 rounded-lg border px-4 py-4 md:px-6 md:py-6">
        <Alert variant="warning">
          <IconAlertTriangle size={16} />
          <AlertTitle>Work in progress</AlertTitle>
          <AlertDescription>
            This is a blank settings page work in progress
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label>Your Avatar</Label>

          <Avatar>
            <AvatarImage src={clerk?.imageUrl} />
            <AvatarFallback className="uppercase">
              {user.firstName?.charAt(0)}
              {user.lastName?.split("").pop()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* TODO: refactor to autoform with schema and so on */}
        <div className="space-y-2">
          <Label>Your Email</Label>

          <Input value={user.email} disabled className="w-max" />
        </div>

        <div className="space-y-2">
          <Label>Your Name</Label>

          <Input
            value={[user?.firstName, user?.lastName].join(" ")}
            disabled
            className="w-max"
          />
        </div>

        <div className="space-y-2">
          <Label>Your Username</Label>

          <Input value={user.username + ""} disabled className="w-max" />
        </div>
      </div>
    </div>
  );
}
