"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "./ui/sidebar";

export const SidebarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname().replace(/\/[a-zA-Z0-9-]+\//, "/");
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <SidebarMenuButton isActive={isActive} asChild>
      <Link href={href}>{children}</Link>
    </SidebarMenuButton>
  );
};
