import { toast } from "@/components/ui/use-toast";
import { RcFile } from "antd/es/upload";
import { type ClassValue, clsx } from "clsx";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import { fileService } from "./api";
import { UploadRequestOption } from "rc-upload/lib/interface";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistanceToNowIn3Days(date: Date) {
  const now = new Date();
  const diffDays = differenceInDays(now, date);
  if (diffDays < 3) {
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
  } else {
    return format(date, "yyyy-MM-dd");
  }
}

export function formatFileSize(size?: number) {
  if (size === undefined) return "";
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export const initActionUrl = async (file: RcFile, token?: string) => {
  try {
    console.log(token, "token str")
    const res = await fileService.generateFileUploadUrl(
      {
        fileName: file.name,
        expiredDuration: 3600,
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    return res.preSignedUrl;
  } catch (error) {
    toast({
      title: "上传失败",
    });
    return Promise.reject("");
  }
};

export const aliyunOssUploadRequest = ({
  action,
  onSuccess,
  onProgress,
  file,
  onError,
}: UploadRequestOption) => {
  axios
    .put(action, file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
      },
      onUploadProgress: ({ total, loaded }) => {
        if (total && loaded) {
          onProgress?.({
            percent: Number(Math.round((loaded / total) * 100).toFixed(2)),
          });
        }
      },
    })
    .then((res: any) => {
      onSuccess?.({
        ...res.data,
        url: action.split("?")[0],
      });
    })
    .catch((err: Error) => {
      onError?.(err);
    });
};
