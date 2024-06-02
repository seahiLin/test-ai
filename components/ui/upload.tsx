import Link from "next/link";
import { Button } from "./button";
import { CloudUpload, LoaderCircle, X } from "lucide-react";
import { Input } from "./input";
import { useRef } from "react";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { aliyunOssUploadRequest, cn, initActionUrl } from "@/lib/utils";
import axios from "axios";

const { Dragger } = Upload;

interface File {
  uid: string;
  name: string;
  // fileName: string;
  status?: "done" | "uploading" | "error" | "removed";
  url?: string;
  // fileType: string;
}

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: initActionUrl,
  customRequest: aliyunOssUploadRequest,
};

export default function FileUpload({
  value,
  onChange,
}: {
  value?: Array<File>;
  onChange: (value: Array<File>) => void;
}) {
  return (
    <div className="">
      <Dragger
        fileList={value}
        {...props}
        onChange={(info) => {
          onChange(info.fileList);
        }}
        rootClassName="flex flex-col flex-col-reverse gap-3"
        itemRender={(_, file, list, { remove }) => {
          return (
            <Button
              variant="secondary"
              className={cn(
                "gap-1 cursor-default",
                file.status === "error" ? " text-primary-brand" : "",
                file.status === "done" ? " text-primary-blue" : ""
              )}
              type="button"
            >
              {file.status === "uploading" ? (
                <LoaderCircle size={12} className="animate-spin" />
              ) : null}
              <div
                className={cn(
                  file.status === "done" ? "cursor-pointer hover:underline" : ""
                )}
                onClick={() => {
                  if (file.status === "done") {
                    window.open(file.url || file.response.url, "_blank");
                  }
                }}
              >
                {file.name}
              </div>
              <X
                size={16}
                className="cursor-pointer text-text-body hover:text-primary-brand"
                onClick={() => {
                  remove();
                }}
              />
            </Button>
          );
        }}
      >
        <div className="relative flex flex-col gap-2 items-center py-4 bg-surface-container text-text-subtitle rounded-md">
          <CloudUpload size={32} />
          <span className="text-primary-teal">点击或拖拽文件到此区域上传</span>
          <span className=" text-text-subtitle text-sm">
            支持单个或批量上传，支持PNG、JPEG、PDF、Doc、Excel格式
          </span>
        </div>
      </Dragger>
    </div>
  );
}
