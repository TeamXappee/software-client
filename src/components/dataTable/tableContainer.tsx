"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DataTableDemo } from "./table";
import { useSearchParams } from "next/navigation";

import Invoice from "./invoice";
import { Dot } from "lucide-react";

export default function TableContainer({
  data,
  totalCount,
  fileId,
}: {
  data: any;
  totalCount: number;
  fileId?: string;
}) {
  const searchParams = useSearchParams();
  const [paginatedData, setPaginatedData] = useState(data);
  const PAGE_SIZE = 13;
  const [pageIndex, setPageIndex] = useState(0);

  const [activeSheet, setActiveSheet] = useState("DETAILS");

  const sheets = useMemo(
    () => searchParams.get("sheets")?.split(",") || [],
    [searchParams]
  );

  const collectionName = useMemo(
    () =>
      activeSheet === "DETAILS" ? "orders" : activeSheet?.toLocaleLowerCase(),
    [activeSheet]
  );

  const handlePageIndex = useCallback((newIdx: number) => {
    setPageIndex(newIdx);
  }, []);

  const handleFetchMore = async () => {
    const nextPageIndex = pageIndex + 1;

    if (nextPageIndex * PAGE_SIZE < data.length) {
      setPageIndex(nextPageIndex);
      return;
    }

    const res = await fetch(
      `http://localhost:8000/api/${collectionName}/all?file_id=${fileId}&pageIndex=${nextPageIndex}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const newData = await res.json();
    setPaginatedData((prevData: any) => [...prevData, ...newData.orders]);
    setPageIndex(newData.currentPageIndex);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <div className="flex gap-4 bg-secondary py-1 px-3 rounded-lg w-fit text-xs items-center">
          {sheets.map((sheet) => (
            <button
              key={sheet} // Add a unique key for each item
              onClick={() => setActiveSheet(sheet)}
              className={`cursor-pointer ${
                activeSheet === sheet &&
                "bg-background p-1 rounded-lg cursor-default"
              }`}
            >
              {sheet}
            </button>
          ))}
        </div>
        <Dot className="text-primary" />
        <Invoice fileId={fileId} />
      </div>
      <DataTableDemo
        handlePageIndex={handlePageIndex}
        handleFetchMore={handleFetchMore}
        PAGE_SIZE={PAGE_SIZE}
        pageIndex={pageIndex}
        data={paginatedData}
        totalCount={totalCount}
      />
    </div>
  );
}
