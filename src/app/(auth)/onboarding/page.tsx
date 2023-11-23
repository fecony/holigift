import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { IconNorthStar } from "@tabler/icons-react";
import { api } from "@/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OnboardingForm from "@/components/form/onboarding-form";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  const userDetails = await api.user.me.query();

  if (!userDetails) {
    return redirect("/auth/sign-up");
  }

  if (userDetails?.isOnboarded) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <h1 className="font-sans text-2xl font-bold md:text-3xl">Onboarding</h1>

      <Alert>
        <IconNorthStar size={16} className="!text-yellow-500" />
        <AlertTitle>Welcome to the Holigift!</AlertTitle>
        <AlertDescription>
          Let&apos;s setup few things before starting
        </AlertDescription>
      </Alert>

      <div className="border-border bg-background flex flex-col gap-y-6 rounded-lg border px-4 py-4 md:px-6 md:py-6">
        <div className="flex flex-row items-center space-x-4">
          <Avatar className="self-start rounded text-right">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="rounded uppercase">
              {user.firstName?.charAt(0)}
              {user.lastName?.split("").pop()}
            </AvatarFallback>
          </Avatar>

          {/* TODO: check if username used is available */}
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
