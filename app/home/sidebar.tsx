import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MotiongOutlinedSvg from "@/public/icons/motiong-outlined.svg";
import StarIcon from "@/public/icons/star.svg";
import { File, LogOut, Plus, Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const { logout } = useAuth0();

  return (
    <div className="h-full flex flex-col">
      <Link href="/" className="inline-block mt-4 mx-5 mb-3">
        <Image src={MotiongOutlinedSvg} alt="home" className="w-[26px]" />
      </Link>
      <div className="flex flex-col mx-4 space-y-6 flex-grow">
        <div>
          <NavItem>
            <NavItemIcon>
              <File size={22} strokeWidth={0.5} />
            </NavItemIcon>
            {!isCollapsed && <NavItemText>文件</NavItemText>}
          </NavItem>
        </div>
        <div>
          <Button
            variant="outline"
            className={cn(
              "space-x-2 w-full justify-start",
              isCollapsed && "p-0 justify-center"
            )}
          >
            <Plus strokeWidth={2} size={12} />
            {!isCollapsed && <span>添加新项目</span>}
          </Button>
          <NavItem>
            <NavItemIcon>
              <Image src={StarIcon} alt="star" width={24} />
            </NavItemIcon>
            {!isCollapsed && (
              <>
                <NavItemText>我收藏的项目</NavItemText>
                <NavSubItemWrapper>
                  <NavSubItem>
                    <ColorBlock color="var(--primary-light-yellow)" />
                    <NavItemText>项目#1</NavItemText>
                  </NavSubItem>
                  <NavSubItem>
                    <ColorBlock color="#70A9FF" />
                    <NavItemText>项目#2</NavItemText>
                  </NavSubItem>
                </NavSubItemWrapper>
              </>
            )}
          </NavItem>
        </div>
        <div className="!mt-auto ml-2 py-5 text-text-title">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3">
                <Settings size={20} />
                <span>设置</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => {
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  }
                })
              }}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

const NavItem: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children, ...props }) => {
  const [icon, text, subItems] = React.Children.toArray(children);

  return (
    <div className={cn("px-2", className)}>
      <div className="flex items-start space-x-3">
        {icon}
        {(text || subItems) && (
          <div>
            {text}
            {subItems}
          </div>
        )}
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
    <div
      className={cn(
        "text-text-main-btn py-2 leading-6 whitespace-nowrap",
        className
      )}
    >
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
