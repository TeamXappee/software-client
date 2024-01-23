import React from "react";

export default function SKRecentlyUploadedFile() {
  return (
    <div className="border border-input p-6 rounded-xl w-2/3 space-y-3">
      <div className="flex flex-wrap gap-2 w-full">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i}  className="w-[18.5rem] h-24 p-6 bg-input  rounded-lg animate-pulse"></div>
          ))}
      </div>
    </div>
  );
}
