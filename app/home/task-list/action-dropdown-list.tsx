import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeX, Clock5, Maximize2, EllipsisIcon, Pencil } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { TaskUpdateOnDisplayContext } from ".";

export default function ActionDropdownList({ taskId }: { taskId: string }) {
  const {
    taskId: taskIdOnDisplay,
    setTaskId,
  } = useContext(TaskUpdateOnDisplayContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 h-fit">
          <EllipsisIcon color="var(--text-subtitle)" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <Link href={`/task/${taskId}`}>
          <DropdownMenuItem className="space-x-2 cursor-pointer">
            <Maximize2 size={16} />
            <span>查看详情</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/task/${taskId}?action=edit`}>
          <DropdownMenuItem className="space-x-2 cursor-pointer">
            <Pencil size={16} />
            <span>编辑</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="space-x-2 cursor-pointer" onClick={() => {
          setTaskId(taskId)
        }}>
          <Clock5 size={16} />
          <span>查看任务更新</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2 cursor-pointer text-primary-brand hover:!text-primary-brand">
          <BadgeX size={16} />
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
