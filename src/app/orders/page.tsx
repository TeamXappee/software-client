"use client";
import { FileManagerSheet } from "@/components/fileManager/sheet";
import React from "react";

export default function OrdersPage() {
  const [uploadedFiles, setUploadedFiles] = React.useState<any | null>(null);
  const filesMetaData = uploadedFiles?.map((file: any) => {
    return file.metadata;
  });
  const handleSetUploadedFiles = (files: any) => {
    setUploadedFiles((prev: any) => prev ? [...prev, ...files] : files);
  };
  return (
    <div>
      <section className="w-full flex justify-between items-center">
        <h1>Orders</h1>
        <FileManagerSheet
          filesMetaData={filesMetaData}
          handleSetUploadedFiles={handleSetUploadedFiles}
        />
      </section>
      {/* {uploadedFiles && (
        <section>
          {uploadedFiles[0]?.data.map((item: any) => (
            <p>{item.CHANNEL_NAME}</p>
          ))}
        </section>
      )} */}
    </div>
  );
}
