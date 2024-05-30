"use client";

import Image from "next/image";
import ChatYellowOutlineIcon from "@/public/icons/chat-yellow-outline.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Paperclip, SendHorizontal } from "lucide-react";
import Logo from "@/public/imgs/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useChat from "@/lib/chat/useChat";
import { useEffect } from "react";

export default function ChatRoom() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  

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
        <div className="grow overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))}
        </div>
        <div className="mx-7">
          <div className="mb-5 text-text-body flex items-center border-xl border-1 rounded-xl overflow-hidden">
            <Button variant="ghost" className="pl-4 p-3 h-fit">
              <Paperclip size={20} />
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Say something to Eve..."
              className="pl-0 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div
              className="p-3 cursor-pointer hover:text-white"
              onClick={handleSubmit}
            >
              <SendHorizontal size={20} />
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
