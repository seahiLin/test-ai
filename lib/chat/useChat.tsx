import { useFileUpload } from "@/app/project/[id]/file-upload";
import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useMount } from "react-use";

export type Message =
  | {
      role: "assistant";
      content: string;
    }
  | {
      role: "user";
      content: {
        query: string;
        project_id?: string;
        attachments?: Array<{
          file_name: string;
          file_link: string;
          file_type: string;
        }>;
      };
    };

export default function useChat() {
  const { getAccessTokenSilently } = useAuth0();
  const { fileList, setFileList } = useFileUpload();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fetchCancelFunc = useRef<Function>();

  useMount(async() => {
    const res = await fetch('https://api.rag.eve.platform.motiong.com/rag/v1/chat_history?project_id=project_id1', {
      headers: {
        "Authorization": `Bearer ${await getAccessTokenSilently()}`,
      },
    })
      .then((res) => res.json());
    if (res.code === 0) {
      setMessages(res.data.history);
    }
  });

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      return;
    }

    const attachments = fileList
      .filter((i) => i.status === "done")
      .map((file) => ({
        file_name: file.name!,
        file_link: file.response.url!,
        file_type: file.type!,
      }));

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: {
          query: inputValue,
          attachments,
        },
      },
    ]);
    setInputValue("");
    setIsTyping(true);
    setFileList([]);

    const controller = new AbortController();
    const res = await fetch(
      "https://api.rag.eve.platform.motiong.com/rag/v1/chat_query",
      {
        method: "POST",
        signal: controller.signal,
        body: JSON.stringify({
          query: inputValue,
          project_id: "project_id1",
          attachments,
        }),
        headers: {
          "Authorization": `Bearer ${await getAccessTokenSilently()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reader = res.body?.getReader();
    if (!reader) {
      setIsTyping(false);
      return;
    }

    fetchCancelFunc.current = controller.abort.bind(controller);

    const newMessage: any = {
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, newMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsTyping(false);
        fetchCancelFunc.current = undefined;
        break;
      }
      const txt = new TextDecoder().decode(value);
      txt.split("\n\n").forEach((t) => {
        if (t.startsWith("data: ")) {
          newMessage.content += JSON.parse(t.slice(6)).message.content;
        }
      });
    }
  };

  return {
    messages,
    input: inputValue,
    handleInputChange,
    handleSubmit,
    isTyping,
    cancel: () => {
      setIsTyping(false);
      fetchCancelFunc.current?.();
    },
  };
}
