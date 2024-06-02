import Filter from "./filter";


export default function ToolBar({
  closeIcon,
}: {
  closeIcon: React.ReactNode;
}) {
  const onFilterChange = () => {};
  return (
    <div className="py-3 pl-6 pr-4 flex items-center justify-between">
      <div className="text-text-subtitle">任务</div>
      {closeIcon}
      {/* <div className="flex items-center space-x-3">
        <Filter onFilterChange={onFilterChange} />
      </div> */}
    </div>
  );
}
