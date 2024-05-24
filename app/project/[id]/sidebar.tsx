"use client";

import Link from "next/link";
import { File, HomeIcon, Share2, UsersRound } from "lucide-react";
import BrandIcon from "@/components/brand-icon";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const getLinks = (projectId: string) => [
  {
    href: `/project/${projectId}`,
    icon: <HomeIcon size={20} strokeWidth={1.5} />,
    label: "首页",
  },
  {
    href: `/project/${projectId}/integrations`,
    icon: <Share2 size={20} strokeWidth={1.5} />,
    label: "集成",
  },
  {
    href: `/project/${projectId}/files`,
    icon: <File size={20} strokeWidth={1.5} />,
    label: "文件",
  },
  {
    href: `/project/${projectId}/members`,
    icon: <UsersRound size={20} strokeWidth={1.5} />,
    label: "成员",
  },
];

export default function Sidebar({ projectId }: { projectId: string }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col items-center text-text-main-btn">
      <Link className="mx-6 py-4 border-b-1" href="/">
        <BrandIcon className="w-6 h-6" />
      </Link>
      {getLinks(projectId).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col gap-2 items-center px-6 py-3",
            pathname === item.href ? " bg-surface-select1" : ""
          )}
        >
          {item.icon}
          <span className="leading-none">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
