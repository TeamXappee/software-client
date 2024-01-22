"use client";
import PageTitle from "@/components/shared/pageTitle";
import FileForm from "@/components/upload/fileForm";
import GroupMetadata from "@/components/upload/groupMetadata";
import UploadedFileList from "@/components/upload/uploadedFileList";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadingFilesState, setUploadingFilesState] =
    useState<string>("idle");
  const [groupMetadata, setGroupMetadata] = useState<any>({
    client: "",
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
    if (!uploadedFiles) return;
    document.getElementById(file.name)?.classList.add("animate-vanish");

    setTimeout(() => {
      setUploadedFiles(uploadedFiles.filter((f: any) => f.name !== file.name));
    }, 550);
  };

  const handleStagingfiles = (e: ChangeEvent<HTMLInputElement>) => {
    const newfilesArray = Array.from(e.target.files || []);
    setUploadedFiles(
      uploadedFiles ? [...uploadedFiles, ...newfilesArray] : newfilesArray
    );
    const form = document.getElementById("files") as HTMLFormElement;
    form.reset();
  };

  const handleSubmitFiles = async (e: any) => {
    e.preventDefault();
    setUploadingFilesState("loading");

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file); // Append each file to the form data
    });
    formData.append("metadata", JSON.stringify(groupMetadata)); // Append metadata as a JSON string

    const response = await fetch("http://localhost:8000/api/files/upload", {
      method: "POST",
      body: formData, // Send the form data
    });

    if (response.ok) {
      const data = await response.json();
      const files = JSON.parse(data.data);
      //   handleSetUploadedFiles(files);
      setUploadedFiles([]);
      setUploadingFilesState("success");
    }
  };

  return (
    <div className="p-6">
      <PageTitle>
        Upload New Files <UploadCloud size={20} />
      </PageTitle>
      <div className="grid  space-y-4">
        <UploadedFileList
          files={uploadedFiles}
          handleRemoveFile={handleRemoveFile}
        />
        <hr />
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmitFiles}
          id="files"
        >
          <GroupMetadata
            uploadingFilesState={uploadingFilesState}
            groupMetadata={groupMetadata}
            handleSetGroupMetadata={handleSetGroupMetadata}
            files={uploadedFiles}
          />
          <FileForm handleStagingfiles={handleStagingfiles} />
        </form>
      </div>
    </div>
  );
}
