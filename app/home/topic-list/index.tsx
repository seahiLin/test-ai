"use client";

import { useState } from "react";
import CategoryFilter from "./category-filter";
import ToolBar from "./tool-bar";
import { cn } from "@/lib/utils";
import { Topic } from "@/lib/api";
import { Timestamp } from "@bufbuild/protobuf";
import { group } from "console";
import Card from "./card";

const topics: Topic[] = [
  {
    name: "id1",
    title: "主题1",
    description: "主题描述1",
    participant: [],
    labels: [],
    group: {
      name: "group1",
      displayName: "组1",
      description: "组描述1",
      roomId: "room1",
      roomName: "房间1",
      sourceType: "飞书",
      labels: [],
    },
    createTime: Timestamp.now(),
    updateTime: Timestamp.now(),
    attachments: [
      {
        type: "FILE",
        fileName: "“Mind in Motion: How Action Shapes Thought”",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
      {
        type: "IMAGE",
        url: "https://test-ai-three.vercel.app/_next/static/media/motiong-outlined.8419d00a.svg",
      },
    ],
  } as any,
  {
    name: "id12",
    title:
      "Definition of Motion G - “Mind in Motion” idea and the Godel Number G",
    description:
      "@Oliver Kwan discusses “Motion G,” referencing Godel number G’s concept of un-obtainability and incompleteness, a mentions a book on motion versus human intelligence. He shares his view that our brains may never fully understand their intelligence due to this paradox. @Cheng Yilian offers a PDF of “Mind in Motion: How Action Shapes Thought” by Barbara Tversky. The book explores how physical movement influences cognitive processes, emphasising embodied cognition, spatial thinking, and interdependence of action and perception. @Goh Chen Sin asks @Cheng Yilian to share the PDF with the group and she provides the link. ",
    participant: [],
    labels: [
      {
        name: "label1",
        displayName: "知识分享",
        color: "red",
      },
    ],
    group: {
      name: "group1",
      displayName: "组1",
      description: "组描述1",
      roomId: "room1",
      roomName: "房间1",
      sourceType: "飞书",
      labels: [],
    },
    createTime: Timestamp.now(),
    updateTime: Timestamp.now(),
    attachments: [
      {
        type: "FILE",
        fileName: "“Mind in Motion: How Action Shapes Thought”",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
      {
        type: "FILE",
        fileName: "“Mind in Motion: How Action Shapes Thought”",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
      {
        type: "IMAGE",
        url: "https://test-ai-three.vercel.app/_next/static/media/motiong-outlined.8419d00a.svg",
      },
    ],
  } as any,
  {
    name: "id123d",
    title:
      "Definition of Motion G - “Mind in Motion” idea and the Godel Number G",
    description:
      "@Oliver Kwan discusses “Motion G,” referencing Godel number G’s concept of un-obtainability and incompleteness, a mentions a book on motion versus human intelligence. He shares his view that our brains may never fully understand their intelligence due to this paradox. @Cheng Yilian offers a PDF of “Mind in Motion: How Action Shapes Thought” by Barbara Tversky. The book explores how physical movement influences cognitive processes, emphasising embodied cognition, spatial thinking, and interdependence of action and perception. @Goh Chen Sin asks @Cheng Yilian to share the PDF with the group and she provides the link. @Oliver Kwan discusses “Motion G,” referencing Godel number G’s concept of un-obtainability and incompleteness, a mentions a book on motion versus human intelligence. He shares his view that our brains may never fully understand their intelligence due to this paradox. @Cheng Yilian offers a PDF of “Mind in Motion: How Action Shapes Thought” by Barbara Tversky. The book explores how physical movement influences cognitive processes, emphasising embodied cognition, spatial thinking, and interdependence of action and perception. @Goh Chen Sin asks @Cheng Yilian to share the PDF with the group and she provides the link.@Oliver Kwan discusses “Motion G,” referencing Godel number G’s concept of un-obtainability and incompleteness, a mentions a book on motion versus human intelligence. He shares his view that our brains may never fully understand their intelligence due to this paradox. @Cheng Yilian offers a PDF of “Mind in Motion: How Action Shapes Thought” by Barbara Tversky. The book explores how physical movement influences cognitive processes, emphasising embodied cognition, spatial thinking, and interdependence of action and perception. @Goh Chen Sin asks @Cheng Yilian to share the PDF with the group and she provides the link.@Oliver Kwan discusses “Motion G,” referencing Godel number G’s concept of un-obtainability and incompleteness, a mentions a book on motion versus human intelligence. He shares his view that our brains may never fully understand their intelligence due to this paradox. @Cheng Yilian offers a PDF of “Mind in Motion: How Action Shapes Thought” by Barbara Tversky. The book explores how physical movement influences cognitive processes, emphasising embodied cognition, spatial thinking, and interdependence of action and perception. @Goh Chen Sin asks @Cheng Yilian to share the PDF with the group and she provides the link.",
    participant: [],
    labels: [
      {
        name: "label1",
        displayName: "知识分享",
        color: "red",
      },
    ],
    group: {
      name: "group1",
      displayName: "组1",
      description: "组描述1",
      roomId: "room1",
      roomName: "房间1",
      sourceType: "飞书",
      labels: [],
    },
    createTime: Timestamp.now(),
    updateTime: Timestamp.now(),
    attachments: [
      {
        type: "FILE",
        fileName: "“Mind in Motion: How Action Shapes Thought”",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
      {
        type: "FILE",
        fileName: "“Mind in Motion: How Action Shapes Thought”",
        url: "https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
      },
      {
        type: "IMAGE",
        url: "https://test-ai-three.vercel.app/_next/static/media/motiong-outlined.8419d00a.svg",
      },
    ],
  } as any,
];

export default function TopicList() {
  const [isExpand, setIsExpand] = useState(false);
  
  return (
    <div className="border-[0.5px] border-border h-full rounded-lg bg-surface flex flex-col">
      <div className="border-b-[0.5px] border-border">
        <ToolBar />
      </div>
      {isExpand ? null : <CategoryFilter />}
      <div className="relative py-4 flex flex-col gap-5 flex-grow overflow-y-auto px-5">
        {topics.map((topic) => (
          <Card key={topic.name} topic={topic} setIsExpand={setIsExpand} />
        ))}
      </div>
    </div>
  );
}
