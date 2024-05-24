import { Button, ButtonProps } from "@/components/ui/button";
import { Bookmark, EyeOff } from "lucide-react";

const categories = [
  {
    label: "公告",
    value: "announcement",
  },
  {
    label: "任务",
    value: "task",
  },
  {
    label: "问题",
    value: "issue",
  },
  {
    label: "讨论",
    value: "discussion",
  },
  {
    label: "文档",
    value: "document",
  },
  {
    label: "其他",
    value: "other",
  },
  {
    label: "项目",
    value: "project",
  }
];

export default function CategoryFilter() {
  return (
    <div className="overflow-x-auto shrink-0">
      <div className="w-fit flex items-center py-2 px-4 text-text-main-btn whitespace-nowrap">
        <>
          <RoundButton>全部</RoundButton>
          <RoundButton className="ml-2">
            <Bookmark size={16} className="mr-1" />
            书签页
          </RoundButton>
          <RoundButton className="ml-2">
            <EyeOff size={16} className="mr-1" />
            已隐藏
          </RoundButton>
        </>
        <div className="w-[0.5px] h-7 bg-border ml-4 mr-2" />
        <span>分类：</span>
        {categories.map((category) => (
          <RoundButton key={category.value} className="ml-2 text-primary-teal hover:text-primary-teal border-primary-teal">
            {category.label}
          </RoundButton>
        ))}
      </div>
    </div>
  );
}

const RoundButton: React.FC<ButtonProps> = ({ className = '', ...props }) => {
  return <Button variant="outline" className={`p-2 h-fit rounded-[100px] ${className}`} {...props} />;
};


