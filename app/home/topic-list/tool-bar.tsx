import Filter from "../task-list/filter";

export default function ToolBar() {
  const onFilterChange = () => {};
  return (
    <div className="py-3 pl-6 pr-4 flex items-center justify-between">
      <div className="text-text-subtitle">话题板</div>
      {/* <div className="flex items-center space-x-3">
        <Filter onFilterChange={onFilterChange} />
      </div> */}
    </div>
  );
}
