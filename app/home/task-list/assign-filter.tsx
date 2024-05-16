import { Button } from "@/components/ui/button";

export default function AssignFilter() {
  return (
    <div className="px-3 py-2 space-x-2">
      <Button variant="outline" className="p-2 h-fit rounded-[100px]">
        分配给我(5)
      </Button>
      <Button variant="outline" className="p-2 h-fit rounded-[100px]">
        我分配的(7)
      </Button>
    </div>
  );
}
