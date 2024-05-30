import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowDown, ChevronDown, File, LogOut, Plus, Settings, Star } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import BrandIcon from "@/components/brand-icon";

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const { logout, user } = useAuth0();

  return (
    <div className="h-full flex flex-col">
      <Link href="/" className="inline-block mt-4 mx-6 mb-5">
        <BrandIcon className="w-7 h-7 text-text-main-btn" />
      </Link>
      <div className="flex flex-col mx-4 space-y-6 flex-grow">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="justify-between w-full h-fit p-0"
              >
                <NavItem className="">
                  <NavItemIcon>
                    <Image
                      src={user?.picture!}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </NavItemIcon>
                  {!isCollapsed && <NavItemText>{user?.name!}</NavItemText>}
                </NavItem>
                <ChevronDown size={16} color="var(--text-subtitle)" className="mr-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin,
                    },
                  });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavItem>
            <NavItemIcon>
              <File size={20} strokeWidth={1.2} />
            </NavItemIcon>
            {!isCollapsed && <NavItemText>文件中心</NavItemText>}
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
              <Star size={20} strokeWidth={1.2} />
            </NavItemIcon>
            {!isCollapsed && <NavItemText>我收藏的项目</NavItemText>}
            {!isCollapsed && (
              <NavSubItemWrapper>
                <Link href="/project/qsei-23">
                  <NavSubItem>
                    <ColorBlock color="var(--primary-light-yellow)" />
                    <NavItemText>项目#1</NavItemText>
                  </NavSubItem>
                </Link>

                <NavSubItem>
                  <ColorBlock color="#70A9FF" />
                  <NavItemText>项目#2</NavItemText>
                </NavSubItem>
              </NavSubItemWrapper>
            )}
          </NavItem>
        </div>
        <div className="!mt-auto py-5 text-text-title"></div>
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
        {text && <div className="grow">{text}</div>}
      </div>
      {subItems}
    </div>
  );
};
const NavItemIcon: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-2 text-text-main-btn shrink-0",
        className
      )}
    >
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
        "text-text-main-btn text-base py-2 line-clamp-1 leading-6 whitespace-nowrap",
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
    <Button
      variant="ghost"
      className={cn(
        "flex items-center pl-9 justify-start w-full space-x-2",
        className
      )}
    >
      {children}
    </Button>
  );
};
const ColorBlock = ({ color }: { color: string }) => {
  return (
    <div className="w-3 h-3 rounded-[1px]" style={{ backgroundColor: color }} />
  );
};
