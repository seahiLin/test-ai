"use client";

import TaskCard from "./card";
import ToolBar from "./tool-bar";
import AssignFilter from "./assign-filter";
import FilterAndOrderStatusBar from "./filter-order-status-bar";
import { useState } from "react";

const items = [
  {
    id: "e33",
    title: "任务标题#1",
    description:
      "任务描述#1就开始两地分居卡送积分卡积分快来睡觉啊快放假啊上看风景卡上；激发科技啊风口浪尖阿克琉斯放假的快乐；阿娇风口浪尖阿斯科利风景撕拉就是弗兰克",
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
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
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
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
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
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
    ],
  },
];

export interface OrderOption {
  key: string;
  label: string;
  value: string;
}
export interface FilterOption {
  key: string;
  label: string;
  value: string | string[];
}

export default function TaskList() {
  const [orderOptions, setOrderOptions] = useState<Array<OrderOption>>([{
    key: "dueDate",
    label: "截止日期，升序",
    value: "asc",
  }]);
  const [filterOptions, setFilterOptions] = useState<Array<FilterOption>>([{
    key: "status",
    label: "任务状态: 未开始",
    value: "UNSTARTED",
  }, {
    key: "dueData",
    label: "截止日期: 2022-01-01",
    value: "2022-01-01",
  }]);

  return (
    <div className="p-3 h-full">
      <div className="border-[0.5px] border-border h-full rounded-md bg-surface flex flex-col">
        <div className="border-b-[0.5px] border-border">
          <ToolBar />
        </div>
        <AssignFilter />
        <FilterAndOrderStatusBar
          orderOptions={orderOptions}
          filterOptions={filterOptions}
        />
        <div className="overflow-y-auto flex-grow">
          {items.map((item) => (
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
