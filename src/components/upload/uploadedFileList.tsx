import React from "react";
import FileCard from "./fileCard";
import PageTitle from "../shared/pageTitle";
import { UploadCloud } from "lucide-react";

export default function UploadedFileList({
  file,
  handleRemoveFile,
}: {
  file: File | null;
  handleRemoveFile: (file: File) => void;
}) {
  return (
    <div>
      <PageTitle>
        Staged File <UploadCloud size={20} />{" "}
        <span className="text-sm text-muted-foreground font-normal">{`(upload 1 file at a time)`}</span>
      </PageTitle>
      <div className="mt-2">
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
    </div>
  );
}
