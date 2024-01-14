import { X } from "lucide-react";
import React from "react";
import { File as FileIcon } from "lucide-react";
export default function FileCard({
  file,
  handleRemoveFile,
}: {
  file: any;
  handleRemoveFile?: (file: any) => void;
}) {
  const name = file.name || file.originalname;
  return (
    <div className="group w-24 h-24 p-2 bg-secondary rounded-lg flex flex-col justify-center items-center gap-1 text-xs relative">
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
