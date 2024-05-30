import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const TimeOptions = [
  {
    value: 0,
    label: "00:00",
  },
  {
    value: 1,
    label: "01:00",
  },
  {
    value: 2,
    label: "02:00",
  },
  {
    value: 3,
    label: "03:00",
  },
  {
    value: 4,
    label: "04:00",
  },
  {
    value: 5,
    label: "05:00",
  },
  {
    value: 6,
    label: "06:00",
  },
  {
    value: 7,
    label: "07:00",
  },
  {
    value: 8,
    label: "08:00",
  },
  {
    value: 9,
    label: "09:00",
  },
  {
    value: 10,
    label: "10:00",
  },
  {
    value: 11,
    label: "11:00",
  },
  {
    value: 12,
    label: "12:00",
  },
  {
    value: 13,
    label: "13:00",
  },
  {
    value: 14,
    label: "14:00",
  },
  {
    value: 15,
    label: "15:00",
  },
  {
    value: 16,
    label: "16:00",
  },
  {
    value: 17,
    label: "17:00",
  },
  {
    value: 18,
    label: "18:00",
  },
  {
    value: 19,
    label: "19:00",
  },
  {
    value: 20,
    label: "20:00",
  },
  {
    value: 21,
    label: "21:00",
  },
  {
    value: 22,
    label: "22:00",
  },
  {
    value: 23,
    label: "23:00",
  },
];

export default function TimePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (value?: Date) => void;
}) {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <Select
      value={date?.getHours().toString()}
      onValueChange={(val) => {
        const newDate = new Date(date!);
        newDate.setHours(Number(val));
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        onChange(newDate);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="时间" />
      </SelectTrigger>
      <SelectContent align="end">
        {TimeOptions.map(({ value, label }) => {
          return (
            <SelectItem key={value} value={value.toString()}>
              <span>{label}</span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
