import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyCtGjAU_4WvG-RhQkgxwbfqmXCpyIg2DGA" || ""
);

export async function POST(req: Request) {
  const { messages } = await req.json();

  // const response = await genAI
  //   .getGenerativeModel({ model: "gemini-1.0-pro-latest" })
  //   .generateContentStream(buildPrompt(messages));

  // const stream = GoogleGenerativeAIStream(response);
  let timerId: any;
  const stream = new ReadableStream({
    start(controller) {
      timerId = setInterval(() => {
        const msg = new TextEncoder().encode(
          `data: ${JSON.stringify({
            message: {
              content: "hello, i am here to help you.",
            },
          })}\n\n`
        );
        controller.enqueue(msg);
      }, 500);
      setTimeout(() => {
        this.cancel?.();
        try {
          controller.close();
        } catch (e) {}
      }, 3000);
    },
    cancel() {
      clearInterval(timerId);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}

// Build a prompt from the messages
function buildPrompt(messages: any[]) {
  return {
    contents: messages
      .filter(
        (message) => message.role === "user" || message.role === "assistant"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [
          {
            text: "You are pretending that you are an eve ai chatbot.",
          },
          {
            text: message.content,
          },
        ],
      })),
  };
}
