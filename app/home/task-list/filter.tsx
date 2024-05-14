"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, Inbox, ListFilter, ListTodo } from "lucide-react";
import React from "react";

const Status = [
  {
    type: "UNSTARTED",
    label: "未开始",
  },
  {
    type: "IN_PROGRESS",
    label: "进行中",
  },
  {
    type: "BLOCKED",
    label: "受阻",
  },
  {
    type: "OVERDUE",
    label: "逾期",
  },
];

export default function Filter({
  onFilterChange,
}: {
  onFilterChange: (filter: {
    statuses: Array<(typeof Status)[number]["type"]>;
  }) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="p-1 h-fit">
          <ListFilter size={20} color="#D1D1D1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ListTodo className="mr-2 h-4 w-4" />
            <span>任务状态</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {Status.map((status) => (
                <DropdownMenuItem key={status.type} className="p-0">
                  <div
                    className="flex items-center space-x-2 px-2 py-[6px] w-full h-full"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Checkbox id={status.type} />
                    <label
                      htmlFor={status.type}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status.label}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>截止日期</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Inbox className="mr-2 h-4 w-4" />
            <span>任务创建日期</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
