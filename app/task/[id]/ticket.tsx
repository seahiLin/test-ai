"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlignLeft,
  Calendar,
  ClipboardCheck,
  File,
  Link,
  Link2,
  Loader,
  User2Icon,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
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
import UpdateListPanel from "@/app/home/task-list/update-list-panel";
import React from "react";
import { TaskUpdateOnDisplayContext } from "@/app/home/task-list";
import AssignerField from "./assigner-field";
import { useMount } from "react-use";
import { Task, taskService } from "@/lib/api";
import AssigneesField from "./assignees-field";
import Upload from "@/components/ui/upload";
import LinksField from "./links-field";
import { title } from "process";
import { cn } from "@/lib/utils";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/components/protected-route";
import { useAuth0 } from "@auth0/auth0-react";
import { Timestamp } from "@bufbuild/protobuf";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "请输入任务标题",
  }),
  status: z.number(),
  deadline: z.date().optional(),
  description: z.string().optional(),
  assigner_and_manager: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      role: z.union([z.literal("ASSIGNER"), z.literal("MANAGER")]),
    })
  ),
  assignees: z
    .array(
      z.object({
        name: z.string(),
        displayName: z.string(),
        role: z.string(),
      })
    )
    .optional(),
  files: z
    .array(
      z.object({
        uid: z.string(),
        name: z.string(),
        // fileName: z.string(),
        status: z.union([
          z.literal("done"),
          z.literal("uploading"),
          z.literal("error"),
        ]),
        // optional
        url: z.optional(z.string()),
        // fileType: z.string(),
      })
    )
    .optional(),
  links: z
    .array(
      z.object({
        fileName: z.string(),
        fileLink: z.string(),
      })
    )
    .optional(),
});

export function TaskTicket({
  onClose,
  taskId,
}: {
  onClose?: () => void;
  taskId: string;
}) {
  const { getAccessTokenSilently } = useAuth0();
  const { toast } = useToast();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [taskDetail, setTaskDetail] = useState<Task>();
  const [editing, setEditing] = useState(params.get("action") === "edit");
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
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (loading) return;

    setLoading(true);
    await taskService
      .updateTask({
        enhancedTask: {
          task: {
            name: decodeURIComponent(taskId),
            title: values.title,
            status: values.status,
            deadline: values.deadline
              ? Timestamp.fromDate(values.deadline)
              : undefined,
            assigner: values.assigner_and_manager.find(
              (i) => i.role === "ASSIGNER"
            ),
            assignees: values.assignees,
            managers: values.assigner_and_manager
              .filter((i) => i.role === "MANAGER")
              .map((i) => ({ name: i.name })),
            description: values.description,
          },
          // appendixStorageUris: [
          //   ...(values.files?.map((file) => ({
          //     fileName: file.name,
          //     storageUri: file.url!,
          //     category: 1,
          //   })) || []),
          //   ...(values.links?.map((link) => ({
          //     fileName: link.fileName,
          //     storageUri: link.fileLink,
          //     category: 2,
          //   })) || []),
          // ],
        },
        updateMask: {
          paths: [
            "title",
            // "status",
            // "deadline",
            "assigner",
            "assignees",
            "managers",
            "description",
            // "appendix_storage_uris"
          ],
        },
      }, {
        headers: {
          Authorization: "Bearer " + (await getAccessTokenSilently()),
        },
      })
      .catch(() => {
        toast({
          title: "更新任务失败",
        });
        setLoading(false);
        return Promise.reject();
      });

    setLoading(false);
    setEditing(false);
    toast({
      title: "保存成功",
    });
  }

  useMount(async () => {
    const res = await taskService.getTask(
      {
        name: decodeURIComponent(taskId),
      },
      {
        headers: {
          Authorization: "Bearer " + (await getAccessTokenSilently()),
        },
      }
    );
    form.setValue("title", res.task!.title);
    form.setValue("status", res.task!.status);
    form.setValue("deadline", res.task!.deadline?.toDate());
    form.setValue(
      "assigner_and_manager",
      [
        res.task!.assigner &&
          ({
            name: res.task!.assigner.name,
            role: "ASSIGNER",
            displayName: res.task!.assigner.displayName,
          } as any),
        ...res.task!.managers?.map((manager) => ({
          name: manager.name,
          role: "MANAGER",
          displayName: manager.displayName,
        })),
      ].filter((i) => i)
    );
    form.setValue(
      "assignees",
      res.task!.assignees?.map((assignee) => ({
        name: assignee.name,
        displayName: assignee.displayName,
        role: assignee.position,
      }))
    );
    form.setValue(
      "files",
      res.appendixStorageUris
        .filter((i) => i.category === 1)
        .map((file) => ({
          uid: file.name,
          name: file.fileName,
          status: "done" as const,
          url: file.storageUri,
        }))
    );
    form.setValue(
      "links",
      res.appendixStorageUris
        .filter((i) => i.category === 2)
        .map((file) => ({
          fileName: file.fileName,
          fileLink: file.storageUri,
        }))
    );

    form.setValue("description", res.task!.description);
  });

  return (
    <ProtectedRoute>
      <div className="flex bg-surface h-[100vh]">
        <Form {...form}>
          <div className="px-4 grow flex flex-col">
            <div className="flex items-center gap-4 mb-10 mt-14">
              <Button
                variant="secondary"
                className="h-fit p-4 rounded-full"
                onClick={onCloseTrigger}
              >
                <X size={16} />
              </Button>
              <FormField
                control={form.control}
                disabled={!editing}
                name="title"
                render={({ field, fieldState }) => {
                  return (
                    <div>
                      <Input
                        {...field}
                        placeholder="请输入任务标题"
                        className={cn(
                          "bg-transparent w-[500px] py-3 px-6 text-2xl border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0",
                          fieldState.error && fieldState.isTouched
                            ? " border-b-primary-brand placeholder:text-primary-brand"
                            : ""
                        )}
                      />
                    </div>
                  );
                }}
              />
              {!editing ? (
                <Button
                  className="bg-primary-darker-teal hover:bg-primary-darker-teal text-text-title"
                  onClick={() => setEditing(true)}
                >
                  编辑任务卡
                </Button>
              ) : (
                <>
                  <Button
                    disabled={loading}
                    className="bg-primary-darker-teal hover:bg-primary-darker-teal text-text-title"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    {loading ? (
                      <Loader size={12} className="animate-spin" />
                    ) : null}
                    保存更改
                  </Button>
                </>
              )}
            </div>
            <div className="h-1 grow overflow-y-auto pb-14">
              {/* <Form {...form}> */}
              <form className="flex flex-col gap-3 px-3 text-text-subtitle">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    return (
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
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0 gap-6">
                      <Calendar size={20} className="mt-0.5" />
                      <div>
                        <FormLabel className="leading-6 mb-3 inline-block">
                          到期：
                        </FormLabel>
                        <div className="flex gap-4 items-center text-white">
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <TimePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assigner_and_manager"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0 gap-6">
                      <User2Icon size={20} className="mt-0.5" />
                      <div className="grow">
                        <FormLabel className="leading-6 mb-3 inline-block">
                          开单人 / 管理者：
                        </FormLabel>
                        <AssignerField
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignees"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0 gap-6">
                      <User2Icon size={20} className="mt-0.5" />
                      <div className="grow">
                        <FormLabel className="leading-6 mb-3 inline-block">
                          接单人：
                        </FormLabel>
                        <AssigneesField
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0 gap-6">
                      <File size={20} className="mt-0.5" />
                      <div className="grow">
                        <FormLabel className="leading-6 mb-3 inline-block">
                          文件型附件：
                        </FormLabel>
                        <Upload value={field.value} onChange={field.onChange} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="links"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0 gap-6">
                      <Link2 size={20} className="mt-0.5" />
                      <div className="grow">
                        <FormLabel className="leading-6 mb-3 inline-block">
                          链接型附件：
                        </FormLabel>
                        <LinksField
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
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
              </form>
              {/* </Form> */}
            </div>
          </div>
          <div className="ml-auto">
            <TaskUpdateOnDisplayContext.Provider
              value={{
                taskId: decodeURIComponent(taskId),
                setTaskId: () => {},
              }}
            >
              <UpdateListPanel closeable={false} />
            </TaskUpdateOnDisplayContext.Provider>
          </div>
        </Form>
      </div>
    </ProtectedRoute>
  );
}
