import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import UserCombobox from "./user-combobox";

export interface AssigneUser {
  name: string;
  displayName: string;
  role: string;
}

const RoleTitleMap: Record<string, string> = {
  ASSIGNER: "开单人",
  MANAGER: "管理员",
}

export default function AssignerField({
  value,
  onChange,
}: {
  value?: Array<AssigneUser>;
  onChange: (value: Array<AssigneUser>) => void;
}) {

  return (
    <div className="space-y-3">
      {value?.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="h-10 w-72 px-5 py-2 rounded-md bg-surface-container">
            {RoleTitleMap[item.role]}
          </div>
          <span>-</span>
          <UserCombobox value={item} onChange={(item) => {
            const newList = [...value];
            newList[index] = item;
            onChange(newList);
          }} />
          {item.role === "MANAGER" && (
            <Button variant="ghost" title="删除管理员" onClick={() => {
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
              role: "MANAGER",
            },
          ]);
        }}
      >
        <Plus size={16} className="mr-1 text-text-title" />
        添加管理员（可选项）
      </Button>
    </div>
  );
}
