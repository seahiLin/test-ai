import * as React from "react";
import Image from "next/image";
import {
  Check,
  FileIcon,
  Link2Icon,
  MoveUpRight,
  ThumbsDown,
  ThumbsUp,
  TriangleAlert,
  X,
} from "lucide-react";
import WechatIcon from "@/public/icons/wechat.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ActionDropdownList from "./action-dropdown-list";
import { TaskUpdateOnDisplayContext } from ".";
import { cn } from "@/lib/utils";
import { Task, taskService } from "@/lib/api";
import { format } from "date-fns";
import { FieldTitleMap, StatusTitleMap } from "./help";
import { toast } from "@/components/ui/use-toast";

type TaskItemProps = {
  item: Task;
  onReject: () => void;
  onAccept: () => void;
  onRemove: () => void;
  onConfirmUpdate: () => void;
};
const UrlIconMap: Record<string, typeof X> = {
  1: FileIcon,
  2: Link2Icon,
};

export default function TaskItem({
  item,
  onReject,
  onAccept,
  onRemove,
  onConfirmUpdate
}: TaskItemProps) {
  const { task } = item;
  const { taskId } = React.useContext(TaskUpdateOnDisplayContext);

  const onTaskRemove = () => {
    onRemove();
  };

  return (
    <article
      className={cn(
        "flex flex-col py-4 pr-3 pl-6 last:border-none border-b-[0.5px] border-border",
        taskId === task!.name ? "bg-surface-container" : ""
      )}
    >
      <div className="flex justify-between w-full whitespace-nowrap">
        <div className="flex gap-2">
          <div className="text-sm leading-6 px-2 rounded-md bg-surface-background h-fit">
            {StatusTitleMap[task!.status]}
          </div>
          {item.isOverdue && (
            <div className="text-sm leading-6 px-2 rounded-md bg-primary-brand h-fit">
              逾期
            </div>
          )}
        </div>
        <ActionDropdownList taskId={task!.name} onRemove={onTaskRemove} />
      </div>
      {item.taskActivityLog && (
        <div
          className="flex items-start gap-2 rounded-lg mt-2 p-2.5 border-1 border-primary-orange border-dashed"
          style={{
            background: "rgba(216, 86, 0, 0.10)",
          }}
        >
          <TriangleAlert className="text-[#FFC700] mt-0.5" size={16} />
          <div className="grow">
            <div className=" text-text-body text-sm">
              任务的
              {item.taskActivityLog.changeItems
                .map(
                  (changeItem, index) =>
                    (FieldTitleMap[changeItem.field] || "") +
                    changeItem.oldValue +
                    "已更新为" +
                    changeItem.newValue
                )
                .join("，")}
              。
              <Link
                href={`/task/${encodeURIComponent(task!.name)}`}
                className=" underline"
              >
                更多详情
              </Link>
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1 text-sm text-text-title px-2 py-1 h-fit"
                onClick={onConfirmUpdate}
              >
                <Check size={12} />
                <span>确认更新并关闭</span>
              </Button>
              <Link href={`/task/${encodeURIComponent(task!.name)}`}>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 text-sm text-text-title px-2 py-1 h-fit"
                >
                  <Check size={12} />
                  <span>编辑任务</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-2 py-1 mt-2.5 text-base font-medium">
        <div className="shrink-0 my-auto w-3 h-3 bg-purple-400 rounded-[1px]" />
        <h3 className="flex-auto text-ellipsis">
          <span className="text-text-title">{task!.title}</span>
        </h3>
      </div>
      <div className="flex gap-2 mt-2.5 text-text-caption">
        <div className="shrink-0 w-px bg-text-caption" />
        <p className="text-sm leading-4 text-ellipsis overflow-hidden line-clamp-3">
          {task!.description}
        </p>
      </div>
      {item.appendixStorageUris.map(({ category, storageUri }, index) => {
        const Icon = UrlIconMap[category] || FileIcon;
        return (
          <Link
            href={storageUri}
            target="_blank"
            key={index}
            className=" flex items-center gap-2 py-0.5 mt-2.5 text-base tracking-normal leading-5"
          >
            <Icon color="var(--text-subtitle)" size={18} />
            <div className="flex-auto underline shrink w-1 overflow-hidden text-ellipsis text-primary-blue">
              {storageUri}
            </div>
          </Link>
        );
      })}

      {task?.deadline && (
        <div className="py-px flex items-center text-sm gap-2 mt-2.5 tracking-normal leading-3">
          <span className="text-text-caption">到期: </span>
          <time className="text-text-body">
            {format(task!.deadline!.toDate(), "yyyy年MM月dd日 HH:mm")}
          </time>
        </div>
      )}
      <div className="text-sm flex gap-2 py-1 mt-2.5 whitespace-nowrap leading-[107%]">
        <div className="text-text-caption">分配者:</div>
        <div className="text-text-body">@{task!.assigner?.displayName}</div>
      </div>
      <div className="text-sm flex gap-2 py-1 mt-2.5 whitespace-nowrap leading-[107%]">
        <div className="text-text-caption">任务者:</div>
        <div className="text-text-body">
          @{task!.assignees.map((i) => i.displayName).join("，")}
        </div>
      </div>
      {task!.isAccepted === undefined && (
        <div className="flex gap-2 mt-2.5 whitespace-nowrap">
          <Button
            variant="outline"
            className="grow bg-[#E728151A] hover:bg-[#E728151A] text-text-title space-x-1 py-1.5 h-fit"
            onClick={onReject}
          >
            <X size={16} />
            <span>拒绝</span>
          </Button>
          <Button
            variant="outline"
            className="grow bg-[#16B1451A] hover:bg-[#16B1451A] text-text-title space-x-1 py-1.5 h-fit"
            onClick={onAccept}
          >
            <Check size={16} />
            <span>接受</span>
          </Button>
        </div>
      )}
      {item.messageSource && (
        <Link
          href={`/task/${encodeURIComponent(task!.name)}/source-info`}
          className="w-fit flex items-center gap-2 px-2.5 py-2 mt-4 whitespace-nowrap rounded-md border-[0.5px] shadow-sm border-border leading-none"
        >
          <MoveUpRight size={14} />
          <div className="flex items-center gap-2 pr-1.5 text-sm">
            <div className="flex-auto text-ellipsis text-text-title text-sm">
              查看来源：
            </div>
            <div className="flex items-center gap-1 text-text-caption">
              <Image src={WechatIcon} alt="wechat" width={14} height={14} />
              <div className="flex-auto text-ellipsis">
                {format(
                  item.messageSource!.firstTime!.toDate(),
                  "yyyy年MM月dd日"
                )}
              </div>
            </div>
          </div>
        </Link>
      )}
      {/* {item.isReaction ? null : <div className="flex items-center gap-4 mt-2.5 text-text-subtitle">
        <span>您对Eve的信息准确性是否满意？</span>
        <Button
          variant="outline"
          className="p-2 h-fit rounded-full text-text-subtitle"
        >
          <ThumbsUp size={16} />
        </Button>
        <Button
          variant="outline"
          className="p-2 h-fit rounded-full text-text-subtitle"
        >
          <ThumbsDown size={16} />
        </Button>
      </div>} */}
    </article>
  );
}
