"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type YearSelectorProps = {
  translation: {
    actions: {
      previousYear: string;
      nextYear: string;
    };
  };
};

export function YearSelector({ translation }: YearSelectorProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentYear =
    Number(searchParams.get("year")) || new Date().getFullYear();

  const updateYear = (newYear: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("year", newYear.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={() => updateYear(currentYear - 1)}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        {translation.actions.previousYear}
      </Button>
      <span className="text-lg font-semibold">{currentYear}</span>
      <Button
        variant="outline"
        onClick={() => updateYear(currentYear + 1)}
        className="flex items-center gap-2"
      >
        {translation.actions.nextYear}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
