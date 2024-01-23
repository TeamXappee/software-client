import { DataTableDemo } from "@/components/dataTable/table";
import React from "react";

export default async function FullfillmentOrders({
  params,
}: {
  params: { file_id: string };
}) {
  let orders;
  try {
    const res = await fetch(
      `http://localhost:8000/api/orders/all/${params.file_id}`,
      {
        headers: {
            'Content-Type': 'application/json'
          },
        cache: "no-store",
      }
    );

    const data = await res.json();
    orders = data.orders;
  } catch (err: any) {
    console.log("err",err.message);
  }
  return (
    <div className="-mt-4 ml-6">
      <DataTableDemo dataa={orders}/>
    </div>
  );
}
