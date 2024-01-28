"use client";
import GroupMetadata from "@/components/upload/groupMetadata";
import RecentlyUploadedFiles from "@/components/upload/recentlyUploadedFiles";
import UploadedFileList from "@/components/upload/uploadedFileList";
import { ChangeEvent, Suspense, useState } from "react";

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadingFileState, setUploadingFileState] = useState<string>("idle");
  const [groupMetadata, setGroupMetadata] = useState<any>({
    client_id: "",
    notes: "",
    user_email: "",
  });

  const handleSetGroupMetadata = (key: any, metadata: any) => {
    if (!key) {
      setGroupMetadata(metadata);
      return;
    }
    setGroupMetadata({ ...groupMetadata, [key]: metadata });
  };

  const handleRemoveFile = (file: any) => {
    setUploadedFile(null);
  };

  const handleStagingfiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploadedFile(e.target.files[0]);
    const form = document.getElementById("files") as HTMLFormElement;
    form.reset();
  };

  const handleSubmitFiles = async (e: any) => {
    e.preventDefault();
    setUploadingFileState("loading");

    try {
      if (!uploadedFile) return;
      const formData = new FormData();
      formData.append("file", uploadedFile); // Append each file to the form data
      formData.append(
        "metadata",
        JSON.stringify({
          fileName: uploadedFile.name,
          size: uploadedFile.size,
          ...groupMetadata,
        })
      ); // Append metadata as a JSON string
      const response = await fetch("http://localhost:8000/api/file/upload", {
        method: "POST",
        body: formData, // Send the form data
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        const result = JSON.parse(data.data);
        console.log(result);
        //   handleSetUploadedFiles(files);
        setUploadedFile(null);
        setUploadingFileState("success");
      }
    } catch (err) {
      console.log(err);
      setUploadingFileState("failed");
    } finally {
      setUploadingFileState("idle");
    }
  };

  return (
    <div className="px-6 space-y-6">
      <RecentlyUploadedFiles uploadingFileState={uploadingFileState} />
      <hr />
      <UploadedFileList
        file={uploadedFile}
        handleRemoveFile={handleRemoveFile}
      />
      <hr />
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmitFiles}
        id="files"
      >
        <GroupMetadata
          handleStagingfiles={handleStagingfiles}
          uploadingFileState={uploadingFileState}
          groupMetadata={groupMetadata}
          handleSetGroupMetadata={handleSetGroupMetadata}
          file={uploadedFile}
        />
      </form>
    </div>
  );
}
