import { Button } from "@/components/ui/button";
import { FilterOption, OrderOption } from ".";
import { X } from "lucide-react";

export default function FilterAndOrderStatusBar({
  filterOptions,
  orderOptions,
}: {
  filterOptions?: Array<FilterOption>;
  orderOptions?: Array<OrderOption>;
}) {
  return (
    <div className="overflow-x-auto shrink-0 py-1.5 scroll">
      <div className="w-fit flex items-center px-6 gap-2">
        {orderOptions?.length ? (
          <div className="flex items-center space-x-2">
            <span className="whitespace-nowrap">排序:</span>
            {orderOptions.map((option) => (
              <Button
                key={option.key}
                variant="outline"
                className="p-2 h-fit cursor-default rounded-[100px] border-primary-teal text-primary-teal hover:text-primary-teal"
              >
                {option.label}
                <X size={16} className="cursor-pointer" />
              </Button>
            ))}
          </div>
        ) : null}
        {filterOptions?.length ? (
          <div className="flex items-center space-x-2">
          <span className="whitespace-nowrap">筛选:</span>
          {filterOptions.map((option) => (
            <Button
              key={option.key}
              variant="outline"
              className="p-2 h-fit cursor-default rounded-[100px] border-primary-teal text-primary-teal hover:text-primary-teal"
            >
              {option.label}
              <X size={16} className="cursor-pointer" />
            </Button>
          ))}
        </div>
        ) : null}
      </div>
    </div>
  );
}
