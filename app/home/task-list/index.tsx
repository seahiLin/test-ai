import TaskCard from "./card";
import ToolBar from "./tool-bar";

const items = [
  {
    id: "e33",
    title: "任务标题#1",
    description: "任务描述#1",
    status: "未完成",
    requiresAttention: true,
    dueDate: "2022-01-01",
    creator: "张三",
    sourceInfo: {
      type: "WECHAT",
      date: "4月19日",
    },
    attachments: [
      {
        type: "PDF",
        url: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: "e331",
    title: "任务标题#1",
    description: "任务描述#1",
    status: "未完成",
    requiresAttention: true,
    dueDate: "2022-01-01",
    creator: "张三",
    sourceInfo: {
      type: "WECHAT",
      date: "4月19日",
    },
    attachments: [
      {
        type: "PDF",
        url: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: "e332",
    title: "任务标题#1",
    description: "任务描述#1",
    status: "未完成",
    requiresAttention: true,
    dueDate: "2022-01-01",
    creator: "张三",
    sourceInfo: {
      type: "WECHAT",
      date: "4月19日",
    },
    attachments: [
      {
        type: "PDF",
        url: "https://via.placeholder.com/150",
      },
    ],
  },
];

export default function TaskList() {
  return (
    <div className="p-3 h-full">
      <div className="border-[0.5px] border-border h-full rounded-md bg-surface flex flex-col">
        <div className=" border-b-[0.5px] border-border">
          <ToolBar />
        </div>
        <div className="overflow-y-auto flex-grow">
          {items.map((item, index) => (
            <TaskCard
              key={item.id}
              {...item}
              onAccept={() => {}}
              onReject={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
