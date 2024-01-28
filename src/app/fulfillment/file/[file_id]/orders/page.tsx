import { DataTableDemo } from "@/components/dataTable/table";
import TableContainer from "@/components/dataTable/tableContainer";
import React from "react";

export default async function FullfillmentOrders({
  params,
}: {
  params: { file_id: string };
}) {
  let orders;
  let totalCount;
  try {
    const res = await fetch(
      `http://localhost:8000/api/orders/all?file_id=${params.file_id}&pageIndex=0`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    orders = data.orders;
    totalCount = data.totalCount;
  } catch (err: any) {
    console.log("err", err.message);
  }

  return (
    <div className=" ml-6">
      <TableContainer
        fileId={params.file_id}
        data={orders}
        totalCount={totalCount}
      />
    </div>
  );
}
