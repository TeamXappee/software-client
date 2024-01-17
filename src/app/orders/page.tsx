"use client";
import OrdersContainer from "@/components/container/ordersContainer";
import React, { useState } from "react";

export default function OrdersPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any | null>(null);

  const filesMetaData = uploadedFiles?.map((file: any) => {
    return file.metadata;
  });

  const handleSetUploadedFiles = (files: any) => {
    setUploadedFiles((prev: any) => (prev ? [...prev, ...files] : files));
  };
  return (
    <OrdersContainer
      uploadedFiles={uploadedFiles}
      handleSetUploadedFiles={handleSetUploadedFiles}
      filesMetaData={filesMetaData}
    />
  );
}
