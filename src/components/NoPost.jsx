import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({ title = "No Data Found", subtitle = "No records available to show." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 space-y-3">
      <Inbox className="w-12 h-12 text-purple-500" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
