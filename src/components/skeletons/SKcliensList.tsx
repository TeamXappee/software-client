import React from "react";

export default function SKCliensList() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-2">
      {Array(15)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-[14rem] h-24 p-6 bg-input  rounded-lg animate-pulse"
          ></div>
        ))}
    </div>
  );
}
