"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  children,
  loadingText = "Submitting...",
  disabled = false,
}: {
  children: React.ReactNode;
  loadingText?: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={disabled} type="submit">
      {pending ? loadingText : children}
    </Button>
  );
};
