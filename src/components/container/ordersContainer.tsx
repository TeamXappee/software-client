import React, { useEffect, useState } from "react";
import { FileManagerSheet } from "../fileManager/sheet";
import DataTableContainer from "../data-table";
import { getAllFileData } from "@/services/files.service";
import { SselectedColumnComboBox } from "../data-table/selectColumnsComboBox";

const PAGE_SIZE = 17;

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
  const [pageIndex, setPageIndex] = useState<number>(0);
  const orders = activeFile?.rows;

  const orderData = orders ? orders[0].data || orders[0] : {};

  const allColumnHeaders = Object.keys(orderData);
  const [selectedColumnsHeaders, setSelectedColumnsHeaders] =
    useState<string[]>(allColumnHeaders);

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
      setActiveFile({ metadata: fileMetaData, rows: fileData });
    }
  };

  const handleTagsChange = (newOptions: string[]) => {
    setSelectedColumnsHeaders(newOptions);
  };
  const handleNextPage = () => {
    setPageIndex((prev) => prev + PAGE_SIZE);
  };
  const handlePreviousPage = () => {
    setPageIndex((prev) => prev - PAGE_SIZE);
  };
  return (
    <div className="">
      <div className="h-14">
        <section className="fixed p-2 z-10 w-full bg-background flex items-center justify-between  ">
          <h1 className="font-semibold text-muted-foreground">
            {activeFile?.metadata?.originalname || "Orders"}
          </h1>
          <div className="flex items-center gap-2">
            <SselectedColumnComboBox
              selectedOptions={selectedColumnsHeaders}
              onTagsChange={handleTagsChange}
              options={allColumnHeaders}
            />
            <FileManagerSheet
              activeFile={activeFile}
              handleSetActiveFile={handleSetActiveFile}
              filesMetaData={filesMetaData}
              handleSetUploadedFiles={handleSetUploadedFiles}
            />
          </div>
        </section>
      </div>
      {activeFile && (
        <DataTableContainer
          handlePreviousPage={handlePreviousPage}
          PAGE_SIZE={PAGE_SIZE}
          pageIndex={pageIndex}
          handleNextPage={handleNextPage}
          selectedColumnsHeaders={selectedColumnsHeaders}
          orders={activeFile.rows}
        />
      )}
    </div>
  );
}
