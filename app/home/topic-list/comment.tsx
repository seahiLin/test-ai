import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  CircleMinus,
  EyeOff,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function Comment({
  hidden,
  achieved,
}: {
  hidden: boolean;
  achieved: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 text-text-subtitle">
        <span>您对Eve的信息准确性是否满意？</span>
        <Button
          variant="outline"
          className="p-2 h-fit rounded-full text-text-subtitle"
        >
          <ThumbsUp size={16} />
        </Button>
        <Button
          variant="outline"
          className="p-2 h-fit rounded-full text-text-subtitle"
        >
          <ThumbsDown size={16} />
        </Button>
      </div>
      <div className="flex items-center text-text-subtitle">
        <Button
          variant="ghost"
          className={cn("h-fit p-2", hidden && "!text-[#FFC300]")}
        >
          <EyeOff size={20} />
        </Button>
        <Button variant="ghost" className="h-fit p-2">
          <CircleMinus size={20} />
        </Button>
        <Button
          variant="ghost"
          className={cn("h-fit p-2", achieved ? "!text-transparent" : "")}
        >
          <Bookmark size={20} fill={achieved ? "#FFC300" : "transparent"} />
        </Button>
      </div>
    </div>
  );
}
