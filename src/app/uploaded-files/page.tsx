"use client";
import OrdersContainer from "@/components/container/ordersContainer";
import {
  getAllUploadedFilesMetadata,
} from "@/services/files.service";
import React, { useEffect, useState } from "react";

export default function UploadedFiles() {
  const [filesMetaData, setFilesMetaData] = useState<any>(null);

  useEffect(() => {
    getAllUploadedFilesMetadata().then((files) => {
      setFilesMetaData(files);
    });
  }, []);

  return <OrdersContainer filesMetaData={filesMetaData} />;
}
