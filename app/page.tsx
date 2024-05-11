'use client';

import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Sidebar from "./home/sidebar";
import TaskList from "./home/task-list";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <div className="h-screen bg-surface">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel
          defaultSize={15}
          maxSize={15}
          minSize={15}
          collapsible
          collapsedSize={5}
          className={cn(
            isCollapsed ?
              "min-w-[70px] w-[70px] max-w-[70px] transition-all duration-300 ease-in-out"
              : "min-w-[230px] w-[230px] max-w-[230px] transition-all duration-300 ease-in-out"
          )}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30} className="min-w-[400px] max-w-[600px]">
          <TaskList />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55}>
          <TaskList />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
