"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AssigneUser } from "./assigner-field";

export default function UserCombobox({
  value,
  onChange,
}: {
  value?: AssigneUser;
  onChange: (value: AssigneUser) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [userList, setUserList] = React.useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const onInputChange = React.useCallback(
    (value: string) => {
      setUserList([
        {
          label: "张三",
          value: "1",
        },
        {
          label: "李四",
          value: "2",
        },
        {
          label: "王五",
          value: "3",
        },
      ] as any);
    },
    [setUserList]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 justify-between"
        >
          {value?.displayName || "根据用户名或职位名称搜索"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="搜索用户..."
            onValueChange={onInputChange}
          />
          <CommandEmpty>没有搜索到用户</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {userList.map((user) => (
                <CommandItem
                  key={user.value}
                  value={user.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value?.name ? {
                      name: "",
                      displayName: "",
                      role: value?.role || "MANAGER",
                    } : {
                      name: currentValue,
                      displayName: user.label,
                      role: value?.role || "MANAGER",
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.name === user.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
