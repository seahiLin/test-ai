'use client';

import TaskList from "@/app/home/task-list";
import Sidebar from "./sidebar";
import ChatRoom from "./chat-room";
import { useSearchParams } from "next/navigation";

export default function Project({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const searchParams = useSearchParams();
  return (
    <div className="h-screen bg-surface-container flex">
      <Sidebar projectId={params.id} />
      <div className="flex flex-col w-96 shrink-0">
        <div className="flex items-center py-4">
          <div className="mr-3 rounded-sm w-5 h-5 bg-yellow-200" />
          <span className="text-text-subtitle">{searchParams.get('project_name')}</span>
        </div>
        <div className="grow h-1 pb-2.5">
          <TaskList projectId={decodeURIComponent(params.id)} />
        </div>
      </div>
      <div className="m-2.5 grow">
        <ChatRoom />
      </div>
    </div>
  );
}
