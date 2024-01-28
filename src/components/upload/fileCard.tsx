import { ArrowRight, X } from "lucide-react";
import React from "react";
import { File as FileIcon } from "lucide-react";
import Link from "next/link";
export default function FileCard({
  file,
  handleRemoveFile,
  activeFile,
  size,
}: {
  file: any;
  handleRemoveFile?: (file: any) => void;
  activeFile?: any;
  size?: "default" | "lg";
}) {
  const name = file?.name || file?.originalname || file?.fileName || "unkown";
  const fileActive = name === activeFile?.metadata?.originalname;
  return (
    <div
      id={file.name}
      className={`group rounded-lg  items-center flex justify-between  gap-2  relative ${
        fileActive ? "bg-green-500" : "bg-secondary"
      } ${
        size === "lg"
          ? " w-[18.5rem] h-18 p-3 text-sm "
          : "flex-col   justify-center  w-24 h-24 p-2 text-xs"
      }
      `}
    >
      <FileIcon strokeWidth={0.8} size={37} className="flex-shrink-0" />

      <p className="block">{size === "lg" ? name : name.slice(0, 10)}</p>

      {file?.fileName && (
        <Link
          className="opacity-0 group-hover:opacity-100 hover:bg-background rounded-full p-1"
          href={`/fulfillment/file/${file._id}/orders?sheets=${file.sheets.join(
            ","
          )}&activeSheet=DETAILS`}
        >
          <ArrowRight size={15} />
        </Link>
      )}
      {handleRemoveFile && ( //file.name is only available when the file is still in staging and not uploaded to the server
        <button
          onClick={() => handleRemoveFile(file)}
          type="button"
          className={`hidden group-hover:block absolute right-0 top-0  rounded-full  p-[2px] bg-input hover:bg-red-500
          ${size === "lg" ? "m-[8px]" : "m-[5px]"}`}
        >
          <X size={size === "lg" ? 16 : 14} />
        </button>
      )}
    </div>
  );
}
