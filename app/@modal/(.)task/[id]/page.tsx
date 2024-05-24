"use client";

import TaskTicket from "@/app/task/[id]/page";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskTicketDrawer() {
  const router = useRouter();
  const [open, setOpen] = useState(true)

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
        <TaskTicket onClose={() => {
          setOpen(false);
          setTimeout(() => {
            router.back();
          }, 300)
          
        }} />
      </DrawerContent>
    </Drawer>
  );
}
