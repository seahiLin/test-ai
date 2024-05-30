"use client";

import { TaskTicket } from "@/app/task/[id]/ticket";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskTicketDrawer({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open === false) {
          router.back();
        }
      }}
    >
      <DrawerContent className="border-none focus-visible:outline-none">
        <TaskTicket
          taskId={params.id}
          onClose={() => {
            setOpen(false);
            setTimeout(() => {
              router.back();
            }, 300);
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}
