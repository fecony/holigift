"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type z } from "zod";
import { api } from "@/trpc/react";
import { UserOnboarding } from "@/server/api/schema";
import AutoForm from "@/components/ui/auto-form";
import MakeAWishButton from "@/components/make-a-wish-button";

export default function OnboardingForm() {
  const router = useRouter();
  const [values, setValues] = useState<Partial<z.infer<typeof UserOnboarding>>>(
    {},
  );

  const {
    mutateAsync: updateUser,
    isSuccess,
    isLoading,
  } = api.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success("Your profile was updated!");
      router.replace("/dashboard");
    },
  });

  return (
    <AutoForm
      className="flex flex-col justify-end"
      onSubmit={(data) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        updateUser(data);
      }}
      formSchema={UserOnboarding}
      values={values}
      onParsedValuesChange={setValues}
      fieldConfig={{
        isPublic: {
          fieldType: "switch",
          description:
            "You can change this later, also you can control visibility of each item",
        },
        sendEmails: {
          fieldType: "switch",
          description: "This is needed so we can spam you some analytics c:",
          inputProps: {
            disabled: true,
          },
        },
      }}
    >
      <MakeAWishButton
        type="submit"
        className="ml-auto w-full"
        disabled={isLoading || isSuccess}
        isLoading={isLoading}
      />
    </AutoForm>
  );
}
