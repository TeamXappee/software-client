import { Plus, PlusCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function FileForm({
  handleStagingfiles,
}: {
  handleStagingfiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className=" ">
      <Button
        type="button"
        variant={"secondary"}
        className="relative bg-primary hover:bg-primary-hover hover:bg-red-800 gap-2 ease-in-out duration-150 cursor-default text-base font-medium rounded-sm"
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
        <PlusCircle strokeWidth={2} size={20} />New
      </Button>
    </div>
  );
}
