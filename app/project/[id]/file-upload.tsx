import { aliyunOssUploadRequest, initActionUrl } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { Upload, UploadFile } from "antd";
import React, { useState } from "react";

export const FileUploadContext = React.createContext<{
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}>({
  fileList: [],
  setFileList: () => {},
});

export default function FileUpload({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fileList, setFileList] = useState<Array<UploadFile>>([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   type: "image/png",
    //   status: "done",
    //   url: "https://lucide.dev/logo.light.svg"
    // },
    // {
    //   uid: "-2",
    //   name: "image.pdf",
    //   type: "application/pdf",
    //   status: "uploading",
    //   percent: 70,
    //   url: "https://lucide.dev/logo.light.svg"
    // },
  ]);

  return (
    <FileUploadContext.Provider
      value={{
        fileList,
        setFileList: (fileList) => {
          setFileList(fileList);
        },
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUpload() {
  return React.useContext(FileUploadContext);
}

export function FileUploadInput({ children }: { children: React.ReactNode }) {
  const { fileList, setFileList } = useFileUpload();
  const { getAccessTokenSilently } = useAuth0();

  return (
    <Upload
      action={async(file) => {
        const token = await getAccessTokenSilently();
        return initActionUrl(file, token)
      }}
      customRequest={aliyunOssUploadRequest}
      multiple
      showUploadList={false}
      fileList={fileList}
      onChange={(info) => {
        setFileList([...info.fileList]);
      }}
    >
      {children}
    </Upload>
  );
}

export function FileUploadList({
  render,
}: {
  render: (
    file: UploadFile,
    action: {
      remove: () => void;
      preview: () => void;
    }
  ) => React.ReactNode;
}) {
  const { fileList, setFileList } = useFileUpload();

  console.log(fileList, "fileList 123");

  return (
    <Upload
      multiple
      fileList={fileList}
      onChange={(info) => setFileList(info.fileList)}
      itemRender={(_, file, list, action) => {
        return render(file, action);
      }}
    />
  );
}
