"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlignLeft, Link2, Plus, X } from "lucide-react";
import { useCallback, useState } from "react";

interface Link {
  fileName: string;
  fileLink: string;
}

export default function LinksField({
  value,
  onChange,
}: {
  value?: Array<Link>;
  onChange: (value: Array<Link>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [showValidateMessage, setShowValidateMessage] = useState<{
    link: string;
  }>();

  const validateField = useCallback(async () => {
    if (!link) {
      setShowValidateMessage({
        link: "链接地址不能为空",
      });
      return Promise.reject();
    } else if (!link.startsWith("http://") && !link.startsWith("https://")) {
      setShowValidateMessage({
        link: "链接地址格式错误",
      });
      return Promise.reject();
    }

    return Promise.resolve();
  }, [link]);

  return (
    <div className="flex items-center flex-wrap gap-2">
      {value?.map((item, index) => (
        <Button
          key={index}
          variant="secondary"
          type="button"
          className=" cursor-default space-x-1"
        >
          <span
            className=" max-w-[320px] overflow-hidden text-ellipsis cursor-pointer hover:underline text-primary-blue"
            onClick={() => {
              window.open(item.fileLink, "_blank");
            }}
          >
            {item.fileName || item.fileLink}
          </span>
          <X
            size={16}
            className=" cursor-pointer hover:text-primary-brand"
            onClick={() => {
              const newList = [...value];
              newList.splice(index, 1);
              onChange(newList);
            }}
          />
        </Button>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Plus size={16} className=" text-text-body" />
            添加链接
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>添加链接</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-text-body">
            <div className="flex gap-4">
              <div className="w-9 pt-2">
                <AlignLeft size={24} />
              </div>
              <Input
                id="name"
                placeholder="链接名称"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex w-9 pt-2">
                <Link2 size={24} />
                <span>*</span>
              </div>
              <div className="w-full">
                <Input
                  id="username"
                  placeholder="链接地址"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                {showValidateMessage?.link && (
                  <Label className="text-primary-brand">
                    {showValidateMessage?.link}
                  </Label>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-0 space-x-0">
            <Button
              variant="ghost"
              type="button"
              className="w-24"
              onClick={() => {
                setOpen(false);
              }}
            >
              取消
            </Button>
            <Button
              type="submit"
              className=" w-24 bg-primary-darker-teal hover:bg-primary-darker-teal text-text-title"
              onClick={async () => {
                await validateField();
                onChange([
                  ...(value || []),
                  { fileName: name, fileLink: link },
                ]);
                setName("");
                setLink("");
                setShowValidateMessage(undefined);
                setOpen(false);
              }}
            >
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
