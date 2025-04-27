import React from "react";

const Skeleton = () => {
  return (
    <div className="space-y-5">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse border-t border rounded-[16px] border-modalBorder flex flex-col gap-5 mb-7"
        >
          <div className="bg-gray-300 w-full rounded-t-[16px] h-[80px]"></div>
          <div className="flex flex-col w-full px-7 pb-7 gap-5">
            <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
            <div className="bg-gray-300 h-3 w-2/3 rounded"></div>
            <div className="bg-gray-300 h-3 w-full rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Skeleton;
