"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlignLeft, Calendar, ClipboardCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import StatusSelect from "./status-select";
import EveFormItem from "@/components/form-item";
import { DatePicker } from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  status: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dueDate: z.date(),
  description: z.string(),
});

export default function TaskTicket({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const onCloseTrigger = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  }, [onClose, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "UNSTARTED",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="py-14 px-4 bg-surface h-[100vh]">
      <div className="flex items-center gap-4 mb-10">
        <Button
          variant="secondary"
          className="h-fit p-4 rounded-full"
          onClick={onCloseTrigger}
        >
          <X size={16} />
        </Button>
        <Input
          placeholder="请输入任务标题"
          className="bg-transparent w-[500px] py-3 px-6 text-2xl border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button className="bg-primary-teal hover:bg-primary-teal text-text-title">
          编辑任务卡
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-3 grid grid-cols-2 gap-x-10 text-text-subtitle"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-start space-y-0 gap-6">
                  <ClipboardCheck size={20} className="mt-0.5" />
                  <div>
                    <FormLabel className="leading-6 mb-3 inline-block">
                      任务状态：
                    </FormLabel>
                    <StatusSelect field={field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex items-start space-y-0 gap-6">
                  <Calendar size={20} className="mt-0.5" />
                  <div>
                    <FormLabel className="leading-6 mb-3 inline-block">
                      到期：
                    </FormLabel>
                    <div className="flex gap-4 items-center text-white">
                      <DatePicker />
                      <TimePicker />
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex items-start space-y-0 gap-6">
                  <AlignLeft size={20} className="mt-0.5" />
                  <div className="grow">
                    <FormLabel className="leading-6 mb-3 inline-block">
                      描述：
                    </FormLabel>
                    <Textarea
                      placeholder="请输入描述信息"
                      {...field}
                      className="text-text-body text-base h-[200px] bg-surface-container"
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
