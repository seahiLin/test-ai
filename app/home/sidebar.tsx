import Image, { StaticImageData } from "next/image";
import MotiongOutlinedSvg from "@/public/icons/motiong-outlined.svg";
import { File, Plus } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <Link href="/" className="inline-block mt-4 mx-5 mb-3">
        <Image src={MotiongOutlinedSvg} alt="home" className="w-[26px]" />
      </Link>
      <div className="mx-4 space-y-6">
        <div>
          <NavItem>
            <NavItemIcon>
              <File size={22} strokeWidth={0.5} />
            </NavItemIcon>
            <NavItemText>文件</NavItemText>
            <NavSubItemWrapper>
              <NavSubItem>
                <ColorBlock color="var(--primary-light-yellow)" />
                <NavItemText>Dashboard</NavItemText>
              </NavSubItem>
              <NavSubItem>
                <ColorBlock color="var(--primary-light-yellow)" />
                <NavItemText>Dashboard</NavItemText>
              </NavSubItem>
            </NavSubItemWrapper>
          </NavItem>
        </div>
        <div>
          <Button variant="outline" className="space-x-2 w-full justify-start">
            <Plus strokeWidth={2} size={12} />
            <span>添加新项目</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NavItem: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children, ...props }) => {
  const [icon, text, subItems] = React.Children.toArray(children);

  return (
    <div className={cn("px-2", className)}>
      <div className="flex items-start space-x-3">
        {icon}
        <div>
          {text}
          {subItems}
        </div>
      </div>
    </div>
  );
};
const NavItemIcon: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children, ...props }) => {
  return (
    <div className={cn("flex items-center justify-center py-2", className)}>
      {children}
    </div>
  );
};
const NavItemText: React.FC<{
  className?: string;
  children: string;
}> = ({ className, children, ...props }) => {
  return (
    <div className={cn("text-text-main-btn py-2 leading-6", className)}>
      {children}
    </div>
  );
};

const NavSubItemWrapper: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children, ...props }) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};
const NavSubItem: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children, ...props }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {children}
    </div>
  );
};
const ColorBlock = ({ color }: { color: string }) => {
  return (
    <div className="w-3 h-3 rounded-[1px]" style={{ backgroundColor: color }} />
  );
};
