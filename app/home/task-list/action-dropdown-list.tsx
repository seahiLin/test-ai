"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeX, Clock5, Maximize2, EllipsisIcon, Pencil } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { TaskUpdateOnDisplayContext } from ".";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ActionDropdownList({
  taskId,
  onRemove,
}: {
  taskId: string;
  onRemove: () => void;
}) {
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const { taskId: taskIdOnDisplay, setTaskId } = useContext(
    TaskUpdateOnDisplayContext
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 h-fit">
          <EllipsisIcon color="var(--text-subtitle)" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <Link href={`/task/${encodeURIComponent(taskId)}`}>
          <DropdownMenuItem className="space-x-2 cursor-pointer">
            <Maximize2 size={16} />
            <span>查看详情</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/task/${encodeURIComponent(taskId)}?action=edit`}>
          <DropdownMenuItem className="space-x-2 cursor-pointer">
            <Pencil size={16} />
            <span>编辑</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="space-x-2 cursor-pointer"
          onClick={() => {
            setTaskId(taskId);
          }}
        >
          <Clock5 size={16} />
          <span>查看任务更新</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="space-x-2 cursor-pointer text-primary-brand hover:!text-primary-brand"
          onClick={() => {
            setShowDeleteConfirmDialog(true);
          }}
        >
          <BadgeX size={16} />
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AlertDialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>你确定要删除该任务吗？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作一旦执行，任务将被移至垃圾桶。您可以在14天内重新激活任务。您想继续吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none text-text-body">
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              className=" bg-[#F95966] border-none text-text-body"
              onClick={onRemove}
            >
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}
