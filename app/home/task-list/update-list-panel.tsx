"use client";

import {
  Calendar,
  ClipboardCheck,
  Clock5,
  MoveRight,
  Text,
  User,
  X,
} from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { TaskUpdateOnDisplayContext } from ".";
import Image from "next/image";
import { formatDistanceToNowIn3Days } from "@/lib/utils";
import { TaskActivityLog } from "@/lib/api";
import { Timestamp } from "@bufbuild/protobuf";
import { useMount } from "react-use";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import HashLoader from "react-spinners/HashLoader";

const FieldIconMap: Record<string, typeof X> = {
  STATUS: ClipboardCheck,
  TITLE: Text,
  DESCRIPTION: Text,
  DEADLINE: Calendar,
  ASSIGNER: User,
  ASSIGNEES: User,
};
const FieldTitleMap: Record<string, string> = {
  STATUS: "任务状态",
  TITLE: "任务标题",
  DESCRIPTION: "任务描述",
  DEADLINE: "截止日期",
  ASSIGNER: "指派人",
  ASSIGNEES: "执行人",
};

const items: Array<TaskActivityLog> = [
  {
    name: "dr",
    operator: {
      displayName: "张三",
      picUrl:
        "https://s.gravatar.com/avatar/199dce77c1efde1ecc1f5281190893db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fl.png",
    },
    createTime: Timestamp.fromDate(new Date("2022-01-01")),
    changeItems: [
      {
        field: "STATUS",
        oldValue: JSON.stringify({ status: "UNSTARTED" }),
        newValue: JSON.stringify({ status: "IN_PROGRESS" }),
      },
      {
        field: "ASSIGNEES",
        oldValue: JSON.stringify({
          assignees: [],
        }),
        newValue: JSON.stringify({
          assignees: [{ displayName: "李四" }],
        }),
      },
    ],
  } as any,
  {
    name: "dr2",
    operator: {
      displayName: "张三d",
      picUrl:
        "https://s.gravatar.com/avatar/199dce77c1efde1ecc1f5281190893db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fl.png",
    },
    createTime: Timestamp.now(),
    changeItems: [
      {
        field: "STATUS",
        oldValue: JSON.stringify({ status: "IN_PROGRESS" }),
        newValue: JSON.stringify({ status: "COMPLETED" }),
      },
      {
        field: "DEADLINE",
        oldValue: JSON.stringify({ deadline: null }),
        newValue: JSON.stringify({ deadline: "2024年5月2日 18:00" }),
      },
    ],
  } as any,
];

export default function UpdateListPanel({
  closeable = true,
}: {
  closeable?: boolean;
}) {
  const { taskId, setTaskId } = useContext(TaskUpdateOnDisplayContext);
  const [logList, setLogList] = useState<Array<TaskActivityLog>>([]);
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

    setLogList([...logList, ...res.enhancedTasks]);
    setSkip(skip + 10);
    setTotal(Number(res.totalSize));
    setLoading(false);
  }, [skip, logList]);

  useMount(() => {
    getTaskList();
  });

  return (
    <div className="flex flex-col h-full w-[380px] bg-surface-container">
      <div className="flex items-center py-3 px-4 text-text-title border-b-[0.5px]">
        <Clock5 size={20} />
        <span className="ml-2">任务更新</span>
        {closeable && <X
          size={20}
          className="ml-auto cursor-pointer p-1 box-content"
          onClick={() => {
            setTaskId(null);
          }}
        />}
      </div>
      <div className="h-1 grow overflow-y-auto">
        {logList.map((item) => (
          <div key={item.name} className="py-3 px-4 border-b-[0.5px]">
            <div className="flex items-start">
              <Image
                // @ts-ignore
                src={item.operator.picUrl}
                alt="pic"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="ml-2">
                <div className="text-text-title mb-1">
                  {/* @ts-ignore */}
                  {item.operator.displayName} 编辑了
                </div>
                <div className="text-sm text-text-caption">
                  {formatDistanceToNowIn3Days(item.createTime!.toDate())}
                </div>
              </div>
            </div>
            <div className="mt-3 ml-8 space-y-2">
              {item.changeItems.map((changeItem) => {
                return (
                  <FieldChangeItem key={changeItem.field} {...changeItem} />
                );
              })}
            </div>
          </div>
        ))}
        <InfiniteScroll
          isLoading={loading}
          hasMore={skip < total}
          next={getTaskList}
        >
          {(loading || skip < total) && (
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
  );
}

function FieldChangeItem({
  field,
  oldValue,
  newValue,
}: {
  field: string;
  oldValue: string;
  newValue: string;
}) {
  const Icon = FieldIconMap[field];

  return (
    <div>
      <div className="flex items-center text-sm text-text-caption">
        <Icon size={16} className="mr-1" />
        {FieldTitleMap[field]}
      </div>
      <div className="flex items-center mt-2 text-text-caption">
        {renderFieldSingleItem(field, oldValue)}
        <MoveRight size={16} className="mx-2" />
        {renderFieldSingleItem(field, newValue)}
      </div>
    </div>
  );
}

const renderFieldSingleItem = (field: string, value: string) => {
  const json = JSON.parse(value);

  switch (field) {
    case "STATUS":
      return (
        <div className="w-fit text-sm leading-6 px-2 rounded-md bg-surface-background h-fit text-text-title">
          {json!.status}
        </div>
      );
    case "ASSIGNEES":
    case "ASSIGNER":
      return (
        <div className="text-sm text-text-title">
          {json!.assignees?.length
            ? json!.assignees.map((i: any) => i.displayName).join("，")
            : "空"}
        </div>
      );
    case "DEADLINE":
      return (
        <time className="text-sm text-text-title">
          {json!.deadline ? json!.deadline : "空"}
        </time>
      );
    default:
      return value;
  }
};
