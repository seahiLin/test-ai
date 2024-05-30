import { ChangeEventHandler, useState } from "react";

export default function useChat() {
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      role: "user" | "bot";
      content: string;
    }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random(),
        role: "user",
        content: inputValue,
      },
    ]);
    setInputValue("");
    setIsTyping(true);

    const res = await fetch("https://api.rag.eve.platform.motiong.com/rag/v1/chat_query", {
      method: "POST",
      body: JSON.stringify({
        query: inputValue,
        project_id: "project_id1",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reader = res.body?.getReader();
    if (!reader) {
      setIsTyping(false);
      return;
    }

    const newMessage: any = {
      id: Math.random(),
      role: "bot",
      content: "",
    }
    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsTyping(false);
        break;
      }
      const txt = new TextDecoder().decode(value)
      newMessage.content += txt;
      setMessages((prev) => [
        ...prev
      ])
    }

    setIsTyping(false);
  };

  return {
    messages,
    input: inputValue,
    handleInputChange,
    handleSubmit,
    isTyping,
  };
}
