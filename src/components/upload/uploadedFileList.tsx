import React from "react";
import FileCard from "./fileCard";

export default function UploadedFileList({
  files,
  handleRemoveFile,
}: {
  files: File[];
  handleRemoveFile: (file: File) => void;
}) {
  return (
    <div className="mt-4 ">
      {files && files.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {files.map((file: any) => (
            <FileCard size="lg" handleRemoveFile={handleRemoveFile} file={file} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No files are being staged right now.
        </p>
      )}
    </div>
  );
}
