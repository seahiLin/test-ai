"use client";

import { useCallback, useState } from "react";
import CategoryFilter from "./category-filter";
import ToolBar from "./tool-bar";
import { EnhancedTopic, Topic, topicService } from "@/lib/api";
import { Timestamp } from "@bufbuild/protobuf";
import Card from "./card";
import { useMount } from "react-use";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "@/components/ui/use-toast";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { getAccessTokenSilently } = useAuth0();
  const [topicList, setTopicList] = useState<Array<EnhancedTopic>>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTopicList = useCallback(async () => {
    setLoading(true);
    const res = await topicService.listTopics({
      pageSize: 10,
      skip,
    }, {
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`
      }
    }).catch(() => {
      toast({
        title: "加载话题列表失败"
      })
      setLoading(false)
      return Promise.reject()
    })

    setTopicList([...topicList, ...res.enhancedTopics]);
    setSkip(skip + 10);
    setTotal(Number(res.totalSize));
    setLoading(false);
  }, [skip, topicList]);

  useMount(() => {
    getTopicList();
  });

  return (
    <div className="border-[0.5px] border-border h-full rounded-lg bg-surface flex flex-col">
      <div className="border-b-[0.5px] border-border">
        <ToolBar />
      </div>
      {/* {isExpand ? null : <CategoryFilter />} */}
      <div className="relative py-4 flex flex-col gap-5 flex-grow overflow-y-auto px-5">
        {loading && skip === 0 && (
          <div className="space-y-4">
            {new Array(5).fill(0).map((_, index) => (
              <div
                key={index}
                className="py-4 pr-3 pl-6 bg-surface-container rounded-md"
              >
                <Skeleton className="h-6 w-24 rounded-md bg-surface" />
                <Skeleton className="h-8 w-1/3 mt-4 bg-surface" />
                <div className="mt-3">
                  <Skeleton className="h-16 bg-surface" />
                </div>
                <Skeleton className="h-8 w-2/3 mt-2.5 bg-surface" />
                <Skeleton className="h-8 w-2/2 mt-2.5 bg-surface" />
              </div>
            ))}
          </div>
        )}
        {!loading && topicList.length === 0 && (
          <div className="text-center py-36 text-text-caption">
            暂无话题
          </div>
        )}
        {topicList.map((item) => (
          <Card
            key={item.topic?.name}
            item={item}
            setIsExpand={setIsExpand}
          />
        ))}

        <InfiniteScroll
          isLoading={loading}
          hasMore={skip < total}
          next={getTopicList}
        >
          {skip < total && (
            <div className="flex justify-center py-6 ">
              <HashLoader
                size={16}
                color="var(--primary-teal)"
                className="text-center"
              />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
