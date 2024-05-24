import { Clock5, X } from "lucide-react";
import { useContext } from "react";
import { TaskUpdateOnDisplayContext } from ".";
import Image from "next/image";
import { formatDistanceToNowIn3Days } from "@/lib/utils";

const items = [
  {
    id: "dr",
    picUrl:
      "https://s.gravatar.com/avatar/199dce77c1efde1ecc1f5281190893db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fl.png",
    name: "张三",
    updateTime: new Date("2022-01-01"),
    details: [
      {
        type: "STATUS",
        prev: "UNSTARTED",
        next: "BLOCK",
      },
    ],
  },
  {
    id: "dr1",
    picUrl:
      "https://s.gravatar.com/avatar/199dce77c1efde1ecc1f5281190893db?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fl.png",
    name: "小明",
    updateTime: new Date("2024-5-21"),
    details: [
      {
        type: "DUEDATE",
        prev: undefined,
        next: new Date(),
      },
    ],
  },
];

export default function UpdateListPanel() {
  const { setTaskId } = useContext(TaskUpdateOnDisplayContext);

  return (
    <div className="h-full w-[380px] bg-surface-container">
      <div className="flex items-center py-3 px-4 text-text-title border-b-[0.5px]">
        <Clock5 size={20} />
        <span className="ml-2">任务更新</span>
        <X
          size={20}
          className="ml-auto cursor-pointer p-1 box-content"
          onClick={() => {
            setTaskId(null);
          }}
        />
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} className="py-3 px-4">
            <div className="flex items-start">
              <Image
                src={item.picUrl}
                alt="pic"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="ml-2">
                <div className="text-text-title mb-1">{item.name} 编辑了</div>
                <div className="text-sm text-text-caption">
                  {formatDistanceToNowIn3Days(item.updateTime)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
