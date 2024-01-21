import { Plus } from "lucide-react";
import React from "react";

export default function FileForm({
  handleStagingfiles,
}: {
  handleStagingfiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="absolute bottom-0 right-0 m-6 ">
      <button
        type="button"
        className="relative bg-primary hover:bg-primary-hover hover:scale-110 ease-in-out duration-150 cursor-default  p-4 rounded-3xl text-lg font-bold"
      >
        <input
          id="upload-files-input"
          onChange={(e) => handleStagingfiles(e)}
          type="file"
          accept=".csv,.xlsx,.xls"
          multiple={true}
          name="files"
          className="absolute w-full h-full rounded-3xl opacity-0  left-0 top-0  cursor-default"
        />
        <span className="flex gap-2 items-center w-full h-full">
          <Plus strokeWidth={3} /> Add New
        </span>
      </button>
    </div>
  );
}
