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
import { TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { time } from "console";
import { FILE } from "dns";
import { useAuth0 } from "@auth0/auth0-react";

export const TaskUpdateOnDisplayContext = React.createContext<{
  taskId: string | null;
  setTaskId: (taskId: string | null) => void;
}>({
  taskId: null,
  setTaskId: () => {},
});

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
  const { getAccessTokenSilently } = useAuth0();
  const [showUnreadTask, setShowUnreadTask] = useState(false);
  const [taskOnDisplay, setTaskOnDisplay] = useState<string | null>(null);
  const [taskList, setTaskList] = useState<Array<Task>>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [unreadTotal, setUnreadTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTaskList = useCallback(
    async (filter?: { filterUnread?: boolean; skip?: number }) => {
      setLoading(true);
      const newSkip = filter?.skip !== undefined ? filter.skip : skip;
      const options: any = {
        pageSize: 10,
        skip: newSkip,
      };
      if (projectId) {
        options.parent = projectId;
      }
      if (filter?.filterUnread !== undefined) {
        filter?.filterUnread && (options.filter = `isRead=false`);
      } else if (showUnreadTask) {
        options.filter = "isRead=false";
      }
      const res = await taskService
        .listTasks(options, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        })
        .catch(() => {
          setLoading(false);
          return Promise.reject();
        });

      const prevList = newSkip === 0 ? [] : taskList;
      setTaskList([...prevList, ...res.enhancedTasks]);
      setSkip(skip + 10);
      setTotal(Number(res.totalSize));
      setUnreadTotal(Number(res.unreadSize));
      setLoading(false);
    },
    [skip, showUnreadTask, taskList]
  );

  const onRemoveTask = async (task: Task, index: number) => {
    await taskService
      .updateTask(
        {
          enhancedTask: {
            task: {
              name: task.task?.name,
              isDeleted: true,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      )
      .catch(() => {
        toast({
          title: "删除任务失败",
        });
        return Promise.reject();
      });

    toast({
      title: "删除任务成功",
    })
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  useMount(() => {
    getTaskList();

    return () => {};
  });
  const onUpdateTaskAcceptStatus = async (task: Task, status: boolean) => {
    await taskService
      .updateTask(
        {
          enhancedTask: {
            task: {
              name: task.task?.name,
              isAccepted: status,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      )
      .catch(() => {
        toast({
          title: "更新失败",
        });
        return Promise.reject();
      });

    task.task!.isAccepted = status;
    const newTaskList = [...taskList];
    setTaskList(newTaskList);
  };

  const onConfirmTaskUpdate = async (item: Task, index: number) => {
    await taskService
      .confirmUpdateTask(
        {
          name: item.task!.name,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      )
      .catch(() => {
        toast({
          title: "确认更新失败",
        });
        return Promise.reject();
      });

    item.taskActivityLog = undefined;
    setTaskList([...taskList]);
  };

  const toggleUnreadTaskFilter = () => {
    setTotal(0);
    setSkip(0);
    setTaskList([]);
    setShowUnreadTask(!showUnreadTask);
    getTaskList({
      skip: 0,
      filterUnread: !showUnreadTask,
    });
  };

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
            <ToolBar
              closeIcon={
                showUnreadTask ? (
                  <X
                    size={16}
                    className="cursor-pointer text-text-subtitle"
                    onClick={toggleUnreadTaskFilter}
                  />
                ) : null
              }
            />
          </div>
          {/* <AssignFilter />
          <FilterAndOrderStatusBar
            orderOptions={orderOptions}
            filterOptions={filterOptions}
          /> */}
          {!showUnreadTask && unreadTotal > 0 && (
            <div
              className="flex justify-between items-cneter text-sm text-text-title py-3 px-6"
              style={{
                background: "rgba(216, 86, 0, 0.20)",
              }}
            >
              <div className="flex items-center space-x-1">
                <TriangleAlert className="text-[#FFC700]" size={16} />
                <span>您有{unreadTotal}个新的任务更新。</span>
              </div>
              <Button
                variant="outline"
                className="h-fit text-sm py-1"
                onClick={toggleUnreadTaskFilter}
              >
                去查看
              </Button>
            </div>
          )}
          {!loading && taskList.length === 0 && (
            <div className="text-center py-40 text-text-caption">暂无任务</div>
          )}
          <div className="overflow-y-auto flex-grow">
            {taskList.map((item, index) => (
              <TaskCard
                key={index}
                item={item}
                onAccept={() => {
                  onUpdateTaskAcceptStatus(item, true);
                }}
                onReject={() => {
                  onUpdateTaskAcceptStatus(item, false);
                }}
                onConfirmUpdate={() => {
                  onConfirmTaskUpdate(item, index);
                }}
                onRemove={() => onRemoveTask(item, index)}
              />
            ))}
            {loading && skip === 0 && (
              <div>
                {new Array(3).fill(0).map((_, index) => (
                  <div
                    className="py-4 pr-3 pl-6 border-b-[0.5px] last:border-b-0"
                    key={index}
                  >
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
                ))}
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
