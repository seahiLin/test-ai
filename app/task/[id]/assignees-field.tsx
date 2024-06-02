import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import UserCombobox from "./user-combobox";

export interface Assignee {
  name: string;
  displayName: string;
  role: string;
}

export default function AssigneesField({
  value,
  onChange,
}: {
  value?: Array<Assignee>;
  onChange: (value: Array<Assignee>) => void;
}) {

  return (
    <div className="space-y-3">
      {value?.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="h-10 w-72 px-5 py-2 rounded-md bg-surface-container">
            {item.role || "接单人"}
          </div>
          <span>-</span>
          <UserCombobox needRole value={item} onChange={(item) => {
            const newList = [...value];
            newList[index] = item;
            onChange(newList);
          }} />
          {index !== 0 && (
            <Button variant="ghost" title="删除成员" onClick={() => {
              const newList = [...value];
              newList.splice(index, 1);
              onChange(newList);
            }}>
              <X size={16} />
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="secondary"
        type="button"
        className="text-text-subtitle bg-surface-container"
        onClick={() => {
          onChange([
            ...(value || []),
            {
              name: "",
              displayName: "",
              role: "",
            },
          ]);
        }}
      >
        <Plus size={16} className="mr-1 text-text-title" />
        添加接单人
      </Button>
    </div>
  );
}
