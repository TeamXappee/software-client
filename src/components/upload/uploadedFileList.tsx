import React from "react";
import FileCard from "./fileCard";

export default function UploadedFileList({
  file,
  handleRemoveFile,
}: {
  file: File|null;
  handleRemoveFile: (file: File) => void;
}) {
  return (
    <div className="mt-4 ">
      {file ? (
        <div className="flex flex-wrap gap-2">
          {
            <FileCard
              size="lg"
              handleRemoveFile={handleRemoveFile}
              file={file}
            />
          }
        </div>
      ) : (
        <p className="text-muted-foreground">
          No files are being staged right now.
        </p>
      )}
    </div>
  );
}
