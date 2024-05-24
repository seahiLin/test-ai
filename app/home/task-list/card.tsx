import * as React from "react";
import Image from "next/image";
import {
  Check,
  FileIcon,
  Link2Icon,
  MoveUpRight,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import WechatIcon from "@/public/icons/wechat.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ActionDropdownList from "./action-dropdown-list";
import { TaskUpdateOnDisplayContext } from ".";
import { cn } from "@/lib/utils";

type TaskItemProps = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  requiresAttention: boolean;
  attachments: {
    type: string;
    url: string;
  }[];
  creator: string;
  sourceInfo: {
    type: string;
    date: string;
  };
  onReject: () => void;
  onAccept: () => void;
};
const UrlIconMap: Record<string, typeof X> = {
  FILE: FileIcon,
  LINK: Link2Icon,
};

export default function TaskItem({
  id,
  title,
  description,
  dueDate,
  status,
  attachments,
  creator,
  sourceInfo,
  onReject,
  onAccept,
}: TaskItemProps) {
  const { taskId } = React.useContext(TaskUpdateOnDisplayContext);
  return (
    <article
      className={cn(
        "flex flex-col py-4 pr-3 pl-6 last:border-none border-b-[0.5px] border-border",
        taskId === id ? "bg-surface-container" : ""
      )}
    >
      <div className="flex justify-between w-full whitespace-nowrap">
        <div className="flex gap-2">
          <div className="text-sm leading-6 px-2 rounded-md bg-surface-background h-fit">
            {status}
          </div>
        </div>
        <ActionDropdownList taskId={id} />
      </div>
      <div className="flex gap-2 py-1 mt-2.5 text-base font-medium">
        <div className="shrink-0 my-auto w-3 h-3 bg-purple-400 rounded-[1px]" />
        <h3 className="flex-auto text-ellipsis">
          <span className="text-text-title">{title}</span>
        </h3>
      </div>
      <div className="flex gap-2 mt-2.5 text-text-caption">
        <div className="shrink-0 w-px bg-text-caption" />
        <p className="text-sm leading-4 text-ellipsis overflow-hidden line-clamp-3">
          {description}
        </p>
      </div>
      {attachments.map(({ type, url }, index) => {
        const Icon = UrlIconMap[type] || FileIcon;
        return (
          <Link
            href={url}
            target="_blank"
            key={index}
            className=" flex items-center gap-2 py-0.5 mt-2.5 text-base tracking-normal leading-5"
          >
            <Icon color="var(--text-subtitle)" size={18} />
            <div className="flex-auto underline shrink w-1 overflow-hidden text-ellipsis text-primary-blue">
              {url}
            </div>
          </Link>
        );
      })}

      <div className="py-px flex items-center text-sm gap-2 mt-2.5 tracking-normal leading-3">
        <span className="text-text-caption">到期: </span>
        <time className="text-text-body">{dueDate}</time>
      </div>
      <div className="text-sm flex gap-2 py-1 mt-2.5 whitespace-nowrap leading-[107%]">
        <div className="text-text-caption">分配者:</div>
        <div className="text-text-body">@{creator}</div>
      </div>
      <div className="text-sm flex gap-2 py-1 mt-2.5 whitespace-nowrap leading-[107%]">
        <div className="text-text-caption">任务者:</div>
        <div className="text-text-body">@你</div>
      </div>
      <div className="flex gap-2 mt-2.5 whitespace-nowrap">
        <Button
          variant="outline"
          className="grow bg-[#E728151A] hover:bg-[#E728151A] text-text-title space-x-1 py-1.5 h-fit"
        >
          <X size={16} />
          <span>拒绝</span>
        </Button>
        <Button
          variant="outline"
          className="grow bg-[#16B1451A] hover:bg-[#16B1451A] text-text-title space-x-1 py-1.5 h-fit"
        >
          <Check size={16} />
          <span>接受</span>
        </Button>
      </div>
      <Link
        href={`/task/${id}`}
        className="w-fit flex items-center gap-2 px-2.5 py-2 mt-4 whitespace-nowrap rounded-md border-[0.5px] shadow-sm border-border leading-none"
      >
        <MoveUpRight size={14} />
        <div className="flex items-center gap-2 pr-1.5">
          <div className="flex-auto text-ellipsis text-text-title text-sm">
            查看来源：
          </div>
          <div className="flex gap-1 text-text-caption">
            <Image src={WechatIcon} alt="wechat" width={16} height={16} />
            <div className="flex-auto text-ellipsis">{sourceInfo.date}</div>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4 mt-2.5 text-text-subtitle">
        <span>您对Eve的信息准确性是否满意？</span>
        <Button variant="outline" className="p-2 h-fit rounded-full text-text-subtitle">
          <ThumbsUp size={16} />
        </Button>
        <Button variant="outline" className="p-2 h-fit rounded-full text-text-subtitle">
          <ThumbsDown size={16} />
        </Button>
      </div>
    </article>
  );
}
