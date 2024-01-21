import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      width={400}
      height={200}
      priority
      alt="Xappee"
      className=" w-24 sm:w-28 object-contain "
    />
  );
}
