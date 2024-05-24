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

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: inputValue,
          },
        ],
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

    setMessages((prev) => [
      ...prev,
      {
        id: Math.random(),
        role: "bot",
        content: "",
      },
    ]);
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsTyping(false);
        break;
      }
      const txt = new TextDecoder().decode(value)
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          content:
            prev[prev.length - 1].content + txt,
        },
      ]);
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
