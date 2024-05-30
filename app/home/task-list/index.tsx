"use client";

import TaskCard from "./card";
import ToolBar from "./tool-bar";
import AssignFilter from "./assign-filter";
import FilterAndOrderStatusBar from "./filter-order-status-bar";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import UpdateListPanel from "./update-list-panel";
import { cn } from "@/lib/utils";
import { Task, taskService } from "@/lib/api";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import HashLoader from "react-spinners/HashLoader";
import { Timestamp } from "@bufbuild/protobuf";
import { Skeleton } from "@/components/ui/skeleton";
import { useMount } from "react-use";

export const TaskUpdateOnDisplayContext = React.createContext<{
  taskId: string | null;
  setTaskId: (taskId: string | null) => void;
}>({
  taskId: null,
  setTaskId: () => {},
});

const items: Array<Task> = [
  {
    task: {
      name: "e33",
      title: "任务标题#1",
      description:
        "任务描述#1就开始两地分居卡送积分卡积分快来睡觉啊快放假啊上看风景卡上；激发科技啊风口浪尖阿克琉斯放假的快乐；阿娇风口浪尖阿斯科利风景撕拉就是弗兰克",
      status: "未开始",
      deadline: Timestamp.now(),
      assigner: {
        displayName: "张三",
      } as any,
      assignees: [
        {
          displayName: "李四",
        } as any,
      ],
      acceptanceStatus: "ACCEPTED",
      rejectionReason: "无",
    } as any,
    appendixStorageUris: [
      {
        fileName: "“Mind in Motion: How Action Shapes Thought”",
        fileLink:
          "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
        fileType: "FILE",
      } as any,
    ],
    comments: [],
    messageSource: {
      sourceType: "WECHAT",
      firstTime: Timestamp.now(),
    } as any,
    isReaction: false,
    isOverdue: true,
  } as any,
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
  const [taskList, setTaskList] = useState<Array<Task>>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTaskList = useCallback(async () => {
    setLoading(true);
    // const res = await taskService.listTasks({
    //   pageSize: 10,
    //   skip,
    // });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = {
      enhancedTasks: items,
      totalSize: 32,
    };

    setTaskList([...taskList, ...res.enhancedTasks]);
    setSkip(skip + 10);
    setTotal(Number(res.totalSize));
    setLoading(false);
  }, [skip, taskList]);

  useMount(() => {
    getTaskList();
  });

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
            {taskList.map((item) => (
              <TaskCard
                key={item.task!.name}
                item={item}
                onAccept={() => {}}
                onReject={() => {}}
              />
            ))}
            {(loading && skip === 0) && (
              <div className="py-4 pr-3 pl-6">
                <Skeleton className="h-6 w-12 rounded-md" />
                <Skeleton className="h-6 w-2/3 mt-3" />
                <div className="mt-3">
                  <Skeleton className="h-12" />
                </div>
                <Skeleton className="h-6 w-2/3 mt-2.5" />
                <Skeleton className="h-6 w-1/2 mt-2.5" />
                <Skeleton className="h-6 w-1/3 mt-2.5" />
                <div className="flex gap-2 mt-2.5">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              </div>
            )}
            <InfiniteScroll
              isLoading={loading}
              hasMore={skip < total}
              next={getTaskList}
            >
              {skip < total && (
                <div className="flex justify-center py-6 ">
                  <HashLoader
                    size={16}
                    color="var(--primary-teal)"
                    className="text-center"
                  />
                </div>
              )}
            </InfiniteScroll>
          </div>
        </div>
        <div
          className={cn(
            "absolute z-10 h-full left-full top-0 border-[0.5px] border-left-0 rounded-r-lg overflow-hidden transition-all duration-300",
            taskOnDisplay ? " translate-x-0" : "-translate-x-full opacity-0"
          )}
        >
          {taskOnDisplay && <UpdateListPanel />}
        </div>
      </div>
    </TaskUpdateOnDisplayContext.Provider>
  );
}
