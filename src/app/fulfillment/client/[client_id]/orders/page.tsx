import { DataTableDemo } from "@/components/dataTable/table";
import React from "react";

export default async function OrderByClient({
  params,
}: {
  params: { client_id: string };
}) {
  let orders;
  try {
    const res = await fetch(
      `http://localhost:8000/api/file/all?client_id=${params.client_id}&pageIndex=0`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    orders = data.orders;
  } catch (err: any) {
    console.log("err", err.message);
  }
  if (!orders) return null;
  return (
    <div className="-mt-4 ml-6">
      <DataTableDemo data={orders} totalCount={0} />
    </div>
  );
}
