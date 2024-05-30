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
    value: string;
    onChange: (value: string) => void;
  };
}) {
  return (
    <Select
      onValueChange={(val) => {
        val && field.onChange(val);
      }}
      value={field.value}
    >
      <FormControl className="w-56">
        <SelectTrigger>
          <SelectValue placeholder="请选择任务状态" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="">
        <SelectItem value="UNSTARTED">
          <StatusTag>未开始</StatusTag>
        </SelectItem>
        <SelectItem value="INPROGRESS">
          <StatusTag className=" bg-[#0069FF]">进行中</StatusTag>
        </SelectItem>
        <SelectItem value="BLOCK">
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
