import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function StatusSelect({
  field,
}: {
  field: {
    value: number;
    onChange: (value: number) => void;
  };
}) {
  return (
    <Select
      onValueChange={(val) => {
        val && field.onChange(Number(val));
      }}
      value={field.value?.toString()}
    >
      <FormControl className="w-56">
        <SelectTrigger>
          <SelectValue placeholder="请选择任务状态" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="">
        <SelectItem value="0">
          <StatusTag>未开始</StatusTag>
        </SelectItem>
        <SelectItem value="1">
          <StatusTag className=" bg-[#0069FF]">进行中</StatusTag>
        </SelectItem>
        <SelectItem value="2">
          <StatusTag className="bg-primary-brand">阻塞</StatusTag>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function StatusTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md w-fit border py-0.5 px-2 text-white",
        className
      )}
    >
      {children}
    </div>
  );
}
