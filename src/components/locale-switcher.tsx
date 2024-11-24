"use client";

import { locales } from "@/locale/locale";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/locale/locale";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/style-utils";

export const LocaleSwitcher = ({
  currentLocale,
  label,
  placeholder,
}: {
  currentLocale: Locale;
  label: string;
  placeholder: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">{label}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {locales.map((locale) => (
              <CommandItem
                key={locale}
                disabled={locale === currentLocale}
                className={cn(locale !== currentLocale && "cursor-pointer")}
                onSelect={() => {
                  router.push(
                    `/${locale}${pathname.replace(`/${currentLocale}`, "")}`,
                  );
                }}
              >
                {locale.toLocaleUpperCase()}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
