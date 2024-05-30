import { Button } from "@/components/ui/button";
import { Topic } from "@/lib/api";
import { format, isThisYear } from "date-fns";
import { Link2, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import Comment from "./comment";
import { cn } from "@/lib/utils";

export default function Card({
  topic,
  setIsExpand,
}: {
  topic: Topic;
  setIsExpand: (expand: boolean) => void;
}) {
  // @ts-ignore
  const fileAttachments = useMemo(() => {
    // @ts-ignore
    return topic.attachments.filter(
      (attachment: any) => attachment.type === "FILE"
    );
    // @ts-ignore
  }, [topic.attachments]);
  // @ts-ignore
  const imageAttachments = useMemo(() => {
    // @ts-ignore
    return topic.attachments.filter(
      (attachment: any) => attachment.type === "IMAGE"
    );
    // @ts-ignore
  }, [topic.attachments]);

  const [expand, setExpand] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col px-4 py-3 rounded-md bg-surface-container",
        expand ? "absolute w-full h-full top-0 left-0 bg-surface px-6 py-5" : ""
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center text-text-caption gap-1">
          <span>{topic.group?.sourceType}</span>/
          <span>{topic.group?.displayName}</span>
          <span className="text-sm ml-1">
            · {formatDate(topic.createTime!.toDate())}
          </span>
        </div>
        <Button
          variant="ghost"
          className="p-2 h-fit text-text-main-btn"
          onClick={() => {
            setExpand(!expand);
            setIsExpand(!expand);
          }}
        >
          <Maximize2 size={16} />
        </Button>
      </div>
      {topic.labels.length ? (
        <div className="mt-1 text-primary-teal">
          {topic.labels.map((label) => (
            <span key={label.name} className="mr-2">
              #{label.displayName}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-2 text-text-body text-lg font-bold">{topic.title}</div>
      <div
        className={cn(
          "mt-2 text-text-caption flex-grow line-clamp-6 overflow-hidden",
          expand ? "overflow-y-auto" : ""
        )}
      >
        {topic.description}
      </div>
      {fileAttachments.length ? (
        <div className="mt-2 flex flex-col items-start gap-2">
          {fileAttachments.map((attachment: any, index: number) => (
            <Link
              href={attachment.url}
              target="_blank"
              key={index}
              className="inline-flex mt-2 items-center rounded-sm gap-1 py-1 px-2 bg-surface-select1"
            >
              <Link2 size={16} className="text-text-caption" />
              <span className=" text-primary-blue line-clamp-1">{attachment.fileName}</span>
            </Link>
          ))}
        </div>
      ) : null}
      <div className="mt-4">
        <Comment hidden achieved />
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  const formatStr = isThisYear(date) ? "MM-dd, HH:mm" : "yyyy-MM-dd, HH:mm";
  return format(date, formatStr);
}
