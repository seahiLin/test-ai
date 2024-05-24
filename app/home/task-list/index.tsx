"use client";

import TaskCard from "./card";
import ToolBar from "./tool-bar";
import AssignFilter from "./assign-filter";
import FilterAndOrderStatusBar from "./filter-order-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateListPanel from "./update-list-panel";
import { cn } from "@/lib/utils";

export const TaskUpdateOnDisplayContext = React.createContext<{
  taskId: string | null;
  setTaskId: (taskId: string | null) => void;
}>({
  taskId: null,
  setTaskId: () => {},
});

const items = [
  {
    id: "e33",
    title: "任务标题#1",
    description:
      "任务描述#1就开始两地分居卡送积分卡积分快来睡觉啊快放假啊上看风景卡上；激发科技啊风口浪尖阿克琉斯放假的快乐；阿娇风口浪尖阿斯科利风景撕拉就是弗兰克",
    status: "未完成",
    requiresAttention: true,
    dueDate: "2022-01-01",
    creator: "张三",
    sourceInfo: {
      type: "WECHAT",
      date: "4月19日",
    },
    attachments: [
      {
        type: "FILE",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
      {
        type: "LINK",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
    ],
  },
  {
    id: "e331",
    title: "任务标题#1",
    description: "任务描述#1",
    status: "未完成",
    requiresAttention: true,
    dueDate: "2022-01-01",
    creator: "张三",
    sourceInfo: {
      type: "WECHAT",
      date: "4月19日",
    },
    attachments: [
      {
        type: "FILE",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
    ],
  },
  {
    id: "e332",
    title: "任务标题#1",
    description: "任务描述#1",
    status: "未完成",
    requiresAttention: true,
    dueDate: "2022-01-01",
    creator: "张三",
    sourceInfo: {
      type: "WECHAT",
      date: "4月19日",
    },
    attachments: [
      {
        type: "FILE",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
    ],
  },
];

export interface OrderOption {
  key: string;
  label: string;
  value: string;
}
export interface FilterOption {
  key: string;
  label: string;
  value: string | string[];
}

export default function TaskList({ projectId }: { projectId?: string }) {
  const [orderOptions, setOrderOptions] = useState<Array<OrderOption>>([
    {
      key: "dueDate",
      label: "截止日期，升序",
      value: "asc",
    },
  ]);
  const [filterOptions, setFilterOptions] = useState<Array<FilterOption>>([
    {
      key: "status",
      label: "任务状态: 未开始",
      value: "UNSTARTED",
    },
    {
      key: "dueData",
      label: "截止日期: 2022-01-01",
      value: "2022-01-01",
    },
  ]);
  const [taskOnDisplay, setTaskOnDisplay] = useState<string | null>(null);

  return (
    <TaskUpdateOnDisplayContext.Provider
      value={{
        taskId: taskOnDisplay,
        setTaskId: setTaskOnDisplay,
      }}
    >
      <div className="h-full relative">
        <div
          className={cn(
            "relative z-30 border-[0.5px] border-border h-full rounded-lg bg-surface flex flex-col",
            taskOnDisplay ? "rounded-r-none" : ""
          )}
        >
          <div className="border-b-[0.5px] border-border">
            <ToolBar />
          </div>
          <AssignFilter />
          <FilterAndOrderStatusBar
            orderOptions={orderOptions}
            filterOptions={filterOptions}
          />
          <div className="overflow-y-auto flex-grow">
            {items.map((item) => (
              <TaskCard
                key={item.id}
                {...item}
                onAccept={() => {}}
                onReject={() => {}}
              />
            ))}
          </div>
        </div>
        <div
          className={cn(
            "absolute z-10 h-full left-full top-0 border-[0.5px] border-left-0 rounded-r-lg overflow-hidden transition-all duration-300",
            taskOnDisplay ? " translate-x-0" : "-translate-x-full opacity-0"
          )}
        >
          <UpdateListPanel />
        </div>
      </div>
    </TaskUpdateOnDisplayContext.Provider>
  );
}
