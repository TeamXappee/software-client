import { Check, Loader2 } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import FileCard from "./fileCard";

export default function UploadingFilesForm({
  handleSetUploadedFiles,
}: {
  handleSetUploadedFiles: (files: any) => void;
}) {
  const [files, setFiles] = useState<any[] | null>(null);
  const [uploadingFilesState, setUploadingFilesState] =
    useState<string>("idle");

  const handleRemoveFile = (file: any) => {
    if (!files) return;
    setFiles(files.filter((f: any) => f.name !== file.name));
  };
  const handleStagingfiles = (e: ChangeEvent<HTMLInputElement>) => {
    const newfilesArray = Array.from(e.target.files || []);
    setFiles(files ? [...files, ...newfilesArray] : newfilesArray);
  };

  const handleSubmitFiles = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadingFilesState("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("http://localhost:8000/api/files/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      const files = JSON.parse(data.data);
      handleSetUploadedFiles(files);
      setFiles(null);
      setUploadingFilesState("success");
    }
  };

  return (
    <form onSubmit={handleSubmitFiles} id="files" className="space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <p className="font-bold text-xl">Staged files</p>
        </div>
        {files && files?.length > 0 && (
          <button
            disabled={uploadingFilesState === "loading"}
            type="submit"
            className=" hover:bg-secondary rounded-full p-1"
          >
            {uploadingFilesState === "loading" ? (
              <Loader2 className=" animate-spin" />
            ) : (
              <Check />
            )}
          </button>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {files?.map((file: any) => (
          <FileCard handleRemoveFile={handleRemoveFile} file={file} />
        ))}
        <div className="relative w-24 text-xs grid place-content-center aspect-square rounded-xl border border-input hover:bg-input  ">
          <input
            onChange={(e) => handleStagingfiles(e)}
            accept=".csv,.xlsx,.xls"
            multiple={true}
            type="file"
            name="files"
            className="absolute w-24 opacity-0  aspect-square top-0 left-0"
          />
          <span className="text-[.8rem] font-semibold">Upload Files</span>
        </div>
      </div>
    </form>
  );
}
