"use client";

import BrandIcon from "@/components/brand-icon";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { toast } from "@/components/ui/use-toast";
import { Message, messageService } from "@/lib/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Timestamp } from "@bufbuild/protobuf";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { useCallback, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useMount } from "react-use";

export default function SourceInfo({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const {} = useAuth0();
  const [messageList, setMessageList] = useState<Array<Message>>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const res = await messageService
      .listMessages({
        parent: decodeURIComponent(id),
        skip,
        pageSize: 10,
      })
      .catch(() => {
        toast({
          title: "获取来源信息列表失败",
        });
        setLoading(false);
        return Promise.reject();
      });

    setLoading(false);
    setTotal(Number(res.totalSize));
    setSkip(skip + 10);
    setMessageList([...messageList, ...res.messages]);
  };

  useMount(async () => {
    getList();
  });

  return (
    <div className="flex items-start py-4 px-5">
      <Link href="/">
        <BrandIcon className="w-6 h-6" />
      </Link>
      <div className="ml-10 mt-14 border-1 border-dashed rounded-xl p-5 overflow-y-auto min-w-[500px]">
        {messageList.map((message) => (
          <div key={message.name} className="flex flex-col gap-2 py-2 border-b-1 last:border-b-0">
            <div className="flex items-center">
              <div className="w-16">发送者</div>
              <div className="mx-4">：</div>
              <div>{message.sender?.displayName}</div>
            </div>
            <div className="flex items-center">
              <div className="w-16">内容</div>
              <div className="mx-4">：</div>
              <div>{message.content}</div>
            </div>
            <div className="flex items-center">
              <div className="w-16">时间</div>
              <div className="mx-4">：</div>
              <div>
                {message.createTime &&
                  format(message.createTime.toDate(), "yyyy年M月d日 HH:mm")}
              </div>
            </div>
          </div>
        ))}
        <InfiniteScroll
          isLoading={loading}
          hasMore={skip < total}
          next={getList}
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
