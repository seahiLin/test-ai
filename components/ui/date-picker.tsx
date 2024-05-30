"use client";

import * as React from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (date?: Date) => void;
}) {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            " justify-start text-left font-normal bg-surface-container border border-input rounded-md h-10 px-4 py-2",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP", {
              locale: zhCN,
            })
          ) : (
            <span className="text-white">请选择日期</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(val) => {
            onChange(val)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
