import Image from "next/image";
import React from "react";

export default function Logo({ width }: { width?: number }) {
  return (
    <Image
      priority
      className={`text-center w-[${width ?? 100}px]  relative top-[2px]`}
      src="/logo.png"
      alt="xappee"
      width="200"
      height="200"
    />
  );
}
