import { X } from "lucide-react";
import React from "react";
import { File as FileIcon } from "lucide-react";
export default function FileCard({
  file,
  handleRemoveFile,
  handleSetActiveFile,
  activeFile,
}: {
  file: any;
  handleRemoveFile?: (file: any) => void;
  handleSetActiveFile?: (filename: string) => void;
  activeFile?: any;
}) {
  const name = file?.name || file?.originalname || "unkown";
  const fileActive = name === activeFile?.metadata?.originalname;
  return (
    <div
      onClick={() => handleSetActiveFile && handleSetActiveFile(name)}
      className={`group w-24 h-24 p-2 rounded-lg flex flex-col justify-center items-center gap-1 text-xs relative ${
        fileActive ? "bg-green-500" : "bg-secondary"
      }
      `}
    >
      {handleRemoveFile && ( //file.name is only available when the file is still in staging and not uploaded to the server
        <button
          onClick={() => handleRemoveFile(file)}
          type="button"
          className="hidden group-hover:block absolute right-0 top-0 m-[5px] rounded-full  p-[2px] bg-input hover:bg-red-500"
        >
          <X size={14} />
        </button>
      )}
      <FileIcon size={30} />
      <span>{name.slice(0, 10)}</span>
    </div>
  );
}
