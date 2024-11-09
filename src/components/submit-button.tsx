"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  children,
  loadingText = "Submitting...",
}: {
  children: React.ReactNode;
  loadingText?: string;
}) => {
  const { pending } = useFormStatus();
  return <Button type="submit">{pending ? loadingText : children}</Button>;
};
