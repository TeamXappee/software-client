import React, { useEffect, useState } from "react";
import { FileManagerSheet } from "../fileManager/sheet";
import DataTableContainer from "../data-table";
import { getAllFileData } from "@/services/files.service";

export default function OrdersContainer({
  uploadedFiles,
  handleSetUploadedFiles,
  filesMetaData,
}: {
  uploadedFiles?: any;
  handleSetUploadedFiles?: any;
  filesMetaData: any;
}) {
  const [activeFile, setActiveFile] = useState<any>(null);

  const handleSetActiveFile = async (filename: any) => {
    if (uploadedFiles) {
      const fileData = uploadedFiles.find(
        (f: any) => f.metadata.originalname === filename
      );
      setActiveFile(fileData);
    } else {
      const fileMetaData = filesMetaData?.find(
        (f: any) => f.originalname === filename
      );
      const fileData = await getAllFileData(fileMetaData);
      setActiveFile({ metadata: fileMetaData, data: fileData });
    }
  };
  return (
    <div>
      <section className="w-full flex justify-between items-center">
        <h1 className="font-semibold text-muted-foreground">
          {activeFile?.metadata?.originalname || "Orders"}
        </h1>
        <FileManagerSheet
          activeFile={activeFile}
          handleSetActiveFile={handleSetActiveFile}
          filesMetaData={filesMetaData}
          handleSetUploadedFiles={handleSetUploadedFiles}
        />
      </section>
      {activeFile  && (
        <DataTableContainer orders={activeFile.data} />
      )}
    </div>
  );
}
