import * as React from "react";
import Image from "next/image";
import { Check, EllipsisIcon, MoveUpRight, X } from "lucide-react";
import WarningIcon from "@/public/icons/warning.svg";
import PdfIcon from "@/public/icons/pdf.png";
import WechatIcon from "@/public/icons/wechat.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function TaskItem({
  id,
  title,
  description,
  dueDate,
  status,
  requiresAttention,
  attachments,
  creator,
  sourceInfo,
  onReject,
  onAccept,
}: TaskItemProps) {
  return (
    <article className="flex flex-col py-4 pr-3 pl-6 last:border-none border-b-[0.5px] border-border">
      <div className="flex justify-between w-full whitespace-nowrap">
        <div className="flex gap-2">
          <div className="text-sm leading-6 px-2 rounded-md bg-surface-background">
            {status}
          </div>
          {requiresAttention && <Image src={WarningIcon} alt="Warning" width={20} height={20} />}
        </div>
        <EllipsisIcon color="var(--text-subtitle)" className="cursor-pointer" />
      </div>
      <div className="flex gap-2 py-1 mt-3 text-base font-medium">
        <div className="shrink-0 my-auto w-3 h-3 bg-purple-400 rounded-sm" />
        <h3 className="flex-auto text-ellipsis">
          <span className="text-text-title">{title}</span>
        </h3>
      </div>
      <div className="flex gap-2 mt-3 leading-4 whitespace-nowrap text-neutral-400">
        <div className="shrink-0 w-px border border-solid bg-text-caption" />
        <p className="text-ellipsis">{description}</p>
      </div>
      <div className="py-px mt-3 text-base tracking-normal leading-3  uppercase text-neutral-300">
        到期: <time className="text-sm">{dueDate}</time>
      </div>
      {attachments.map(({type, url}) => (
        <div
          key={url}
          className="flex items-center gap-2 py-0.5 mt-3 text-base tracking-normal leading-5 text-blue-400"
        >
          <Image
            src={PdfIcon}
            alt="pdf"
            width={16}
          />
          <div className="flex-auto underline">{url}</div>
        </div>
      ))}

      <div className="flex gap-1.5 py-1 mt-3 whitespace-nowrap leading-[107%] text-neutral-400">
        <div className="text-ellipsis">开单人：</div>
        <div className="flex-auto text-ellipsis">@{creator}</div>
      </div>
      <Link href={`/task/${id}`} className="w-fit flex items-center gap-2 px-2.5 py-2 mt-3 whitespace-nowrap rounded-md border border-solid shadow-sm bg-surface-select1 border-border leading-none">
        <MoveUpRight size={12} />
        <div className="flex gap-2 pr-1.5">
          <div className="flex-auto text-ellipsis text-neutral-200">
            查看来源：
          </div>
          <div className="flex gap-1 text-neutral-400">
            <Image
              src={WechatIcon}
              alt="wechat"
              width={16}
            />
            <div className="flex-auto text-ellipsis">{sourceInfo.date}</div>
          </div>
        </div>
      </Link>
      <div className="flex gap-4 justify-end mt-3 whitespace-nowrap">
        <Button variant="outline" className="bg-[#E728151A] hover:bg-[#E728151A] text-text-title space-x-1 py-1.5 h-fit">
          <X size={16} />
          <span>拒绝</span>
        </Button>
        <Button variant="outline" className="bg-[#16B1451A] hover:bg-[#16B1451A] text-text-title space-x-1 py-1.5 h-fit">
          <Check size={16} />
          <span>接受</span>
        </Button>
      </div>
    </article>
  );
}
