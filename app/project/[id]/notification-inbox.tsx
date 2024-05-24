

export default function NotificationInbox() {
  return (
    <div className="relative w-72 h-full rounded-lg border-[0.5px] border-border-default bg-surface">
      <div className="sticky top-0 border-b-[0.5px] py-3 px-6 text-text-main-btn">
        收件通知箱
      </div>
      <div className="text-center py-14 text-text-caption text-sm">
        没有更多的消息
      </div>
    </div>
  )
}