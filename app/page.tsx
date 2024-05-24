"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Sidebar from "./home/sidebar";
import TaskList from "./home/task-list";
import ProtectedRoute from "@/components/protected-route";
import TopicList from "./home/topic-list";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div className="h-screen bg-surface-container">
        <ResizablePanelGroup direction="horizontal" className="">
          <ResizablePanel
            defaultSize={15}
            maxSize={15}
            minSize={15}
            collapsible
            collapsedSize={5}
            className={cn(
              isCollapsed
                ? "min-w-[72px] w-[72px] max-w-[72px] transition-all duration-300 ease-in-out"
                : "min-w-[230px] w-[230px] max-w-[230px] transition-all duration-300 ease-in-out"
            )}
            onCollapse={() => setIsCollapsed(true)}
            onExpand={() => setIsCollapsed(false)}
          >
            <Sidebar isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={30}
            className="min-w-[405px] max-w-[405px] p-3 !overflow-visible"
          >
            <TaskList />
          </ResizablePanel>
          <ResizablePanel defaultSize={55} className="p-3 pl-0">
            <TopicList />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ProtectedRoute>
  );
}
