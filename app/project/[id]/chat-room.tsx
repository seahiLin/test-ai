"use client";

import Image from "next/image";
import ChatYellowOutlineIcon from "@/public/icons/chat-yellow-outline.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  CirclePlus,
  Copy,
  Info,
  Paperclip,
  SendHorizontal,
  Square,
  X,
} from "lucide-react";
import Logo from "@/public/imgs/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useChat, { Message } from "@/lib/chat/useChat";
import { useContext, useEffect, useState } from "react";
import { cn, formatFileSize } from "@/lib/utils";
import BrandIcon from "@/components/brand-icon";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "@/components/ui/use-toast";
import { WindupChildren, useWindupString } from "windups";
import FileUpload, {
  FileUploadContext,
  FileUploadInput,
  FileUploadList,
  useFileUpload,
} from "./file-upload";
import { Textarea } from "@/components/ui/textarea";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { FileIconMap } from "./help";
import CommonFileIcon from "@/public/icons/common-file.png";

export default function Page() {
  return (
    <FileUpload>
      <ChatRoom />
    </FileUpload>
  );
}

function ChatRoom() {
  const { messages, input, handleInputChange, handleSubmit, isTyping, cancel } =
    useChat();
  const { fileList } = useFileUpload();

  useEffect(() => {
    const anchor = document.querySelector('[data-scroll-anchor="true"]');
    anchor?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full rounded-lg border-[0.5px] border-border-default bg-surface">
      <div className="top-0 border-b-[0.5px] py-3 px-6 text-text-main-btn">
        <div className="flex items-center">
          <Image
            src={ChatYellowOutlineIcon}
            alt="chat"
            width={24}
            height={24}
          />
          <span className="mx-2">项目助理</span>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Info size={20} />
              </TooltipTrigger>
              <TooltipContent>
                <p>专注于本项目的 Ai 助手</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-col grow h-1">
        <div className="grow overflow-y-auto p-8 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              data-scroll-anchor={index === messages.length - 1}
              className={cn(
                "flex",
                msg.role === "user" ? " justify-end" : " justify-start"
              )}
            >
              <ChatCard
                message={msg}
                typing={
                  isTyping &&
                  msg.role === "assistant" &&
                  index === messages.length - 1
                }
              />
            </div>
          ))}
        </div>
        <div className="mx-7">
          <div className="border-1 rounded-xl mb-5 overflow-hidden">
            <div
              className={cn(
                fileList.length > 0
                  ? "border-b-[0.5px] px-4 py-3 flex items-center flex-wrap"
                  : ""
              )}
            >
              <FileUploadList
                render={(file, { remove, preview }) => {
                  return file.type?.startsWith("image") ? (
                    <div className="relative">
                      <Image
                        src={file.url || file.response?.url || ""}
                        alt=""
                        height={64}
                        width={64}
                        className="rounded-md h-16 max-w-60 object-cover"
                      />
                      <X
                        size={14}
                        className="p-0.5 text-white bg-primary-brand rounded-full absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={remove}
                      />
                    </div>
                  ) : (
                    <div
                      className="relative flex items-center gap-1 bg-surface-container rounded-md px-2 py-3 text-text-body "
                      onClick={preview}
                      style={{
                        background: `linear-gradient(to right, #272727 0%, #272727 ${file.percent}%, #393939 ${file.percent}%, #393939 100%)`,
                      }}
                    >
                      <Image
                        src={FileIconMap[file.type || ""] || CommonFileIcon}
                        alt="icon"
                        width={40}
                      />
                      <div
                        className={cn(
                          file.status === "error" ? "text-primary-brand" : ""
                        )}
                      >
                        <div className="text-sm max-w-40 text-ellipsis whitespace-nowrap overflow-hidden">
                          {file.name}
                        </div>
                        <div className="text-xs">
                          {file.status === "uploading" &&
                            `已上传${file.percent}%`}
                          {file.status === "done" && formatFileSize(file.size)}
                          {file.status === "error" && "上传失败"}
                        </div>
                      </div>
                      <X
                        size={14}
                        className="p-0.5 text-white bg-primary-brand rounded-full absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={remove}
                      />
                    </div>
                  );
                }}
              />
            </div>
            <div className="text-text-body flex items-center">
              <FileUploadInput>
                <Button
                  variant="ghost"
                  className="pl-4 p-3 h-fit text-text-caption"
                >
                  <CirclePlus size={20} />
                </Button>
              </FileUploadInput>
              <AutosizeTextarea
                value={input}
                onChange={handleInputChange}
                minHeight={40}
                // onKeyDown={(e) => {
                // Submit on Enter
                // and
                // }}
                placeholder="Say something to Eve..."
                className="pl-0 h-10 leading-[26px] resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                variant="ghost"
                disabled={!input && !isTyping}
                className="p-3 cursor-pointer hover:text-white hover:bg-transparent"
                onClick={isTyping ? cancel : handleSubmit}
              >
                {isTyping ? <Square size={20} /> : <SendHorizontal size={20} />}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center text-text-caption text-xs leading-7 mb-2">
            <span>E.V.E May 2024 Version.</span>
            <Image src={Logo} alt="logo" height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatCard({ message, typing }: { message: Message; typing?: boolean }) {
  const [copyState, setCopyState] = useState("init");
  const [content, { skip }] = useWindupString(
    message.role === "assistant" && typing ? message.content : "",
    {
      pace: (char) => {
        return message.role === "assistant" && message.content.length
          ? 2000 / message.content.length
          : 50;
      },
    }
  );

  return message.role === "user" ? (
    <div className="flex flex-col gap-2 bg-surface-container rounded-lg py-2.5 px-3 text-text-body font-[500]">
      {message.content.attachments?.map((attachment, index) =>
        attachment.file_type.startsWith("image") ? (
          <Image
            src={attachment.file_link}
            alt=""
            width={160}
            height={100}
            className="w-auto max-h-36 rounded-md"
          />
        ) : (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-1 bg-[#424242] rounded-md px-2 py-3 text-text-body "
            onClick={() => {
              window.open(attachment.file_link, "_blank");
            }}
          >
            <Image
              src={FileIconMap[attachment.file_type || ""] || CommonFileIcon}
              alt="icon"
              width={40}
            />
            <div>
              <div className="text-sm max-w-40 text-ellipsis whitespace-nowrap overflow-hidden">
                {attachment.file_name}
              </div>
              {/* <div className="text-xs">
              {formatFileSize(file.size)}
            </div> */}
            </div>
          </div>
        )
      )}
      <div>{message.content.query}</div>
    </div>
  ) : (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="border-[0.5px] border-text-main-btn rounded-full p-1.5 text-text-main-btn">
          <BrandIcon className="w-5 h-5" />
        </div>
        <span>Eve</span>
      </div>
      <Markdown
        className="bg-surface-container rounded-lg py-2.5 px-3 text-text-body"
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div>
                <div className="mt-2 -mb-2 rounded-t-md flex justify-between items-center bg-surface py-1 px-2">
                  {match[1]}
                  {copyState === "success" ? (
                    <div className="flex items-center gap-1">
                      <Check size={16} />
                      Copied
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          String(children).replace(/\n$/, "")
                        );
                        setCopyState("success");
                        setTimeout(() => {
                          setCopyState("init");
                        }, 2000);
                      }}
                    >
                      <Copy size={16} />
                      Copy
                    </div>
                  )}
                </div>
                <SyntaxHighlighter
                  {...rest}
                  ref={rest.ref as any}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={atomDark}
                />
              </div>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          link: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          h1: ({ node, ...props }) => {
            return (
              <WindupChildren skipped={!typing}>
                <h1
                  {...props}
                  className="text-lg font-[700] text-primary-teal"
                />
              </WindupChildren>
            );
          },
          h2: ({ node, ...props }) => {
            return (
              <WindupChildren skipped={!typing}>
                <h2 {...props} className="font-[700]" />
              </WindupChildren>
            );
          },
          h3: ({ node, ...props }) => {
            return (
              <WindupChildren skipped={!typing}>
                <h3 {...props} className="font-[400]" />
              </WindupChildren>
            );
          },
          // p: ({ node, ...props }) => {
          //   return (
          //     <WindupChildren skipped={!typing}>
          //       {props.children}
          //     </WindupChildren>
          //   );
          // },
        }}
      >
        {typing ? content : message.content}
      </Markdown>
    </div>
  );
}
