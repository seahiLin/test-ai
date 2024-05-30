import { TaskTicket } from "./ticket";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <TaskTicket taskId={params.id} />
  )
}