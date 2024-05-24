import TaskList from "@/app/home/task-list";
import Sidebar from "./sidebar";
import ChatRoom from "./chat-room";
import NotificationInbox from "./notification-inbox";

export default function Project({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="h-screen bg-surface-container flex">
      <Sidebar projectId={params.id} />
      <div className="flex flex-col w-96">
        <div className="flex items-center py-4">
          <div className="mr-3 rounded-sm w-5 h-5 bg-yellow-200" />
          <span className="text-text-subtitle">项目# {params.id}</span>
        </div>
        <div className="grow h-1 pb-2.5">
          <TaskList projectId={params.id} />
        </div>
      </div>
      <div className="m-2.5 grow">
        <ChatRoom />
      </div>
      <div className="m-2.5 ml-0">
        <NotificationInbox />
      </div>
    </div>
  );
}
