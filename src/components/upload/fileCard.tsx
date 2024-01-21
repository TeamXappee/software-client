import { X } from "lucide-react";
import React from "react";
import { File as FileIcon } from "lucide-react";
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
  const name = file?.name || file?.originalname || "unkown";
  const fileActive = name === activeFile?.metadata?.originalname;
  return (
    <div
      id={file.name}
      className={`group rounded-lg  items-center flex  gap-1  relative ${
        fileActive ? "bg-green-500" : "bg-secondary"
      } ${
        size === "lg"
          ? " w-56 h-18 p-4 text-sm gap-3"
          : "flex-col   justify-center  w-24 h-24 p-2 text-xs"
      }
      `}
    >
      <FileIcon strokeWidth={1.2} size={32} className="flex-shrink-0" />
      <p className="block">{size === "lg" ? name : name.slice(0, 10)}</p>
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
