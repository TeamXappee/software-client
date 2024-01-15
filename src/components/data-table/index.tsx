import { TOrderData } from "@/types/order";
import React from "react";

export default function DataTableContainer({ orders }: { orders: any }) {
  const tableHeader = Object.keys(orders[0].data);
  return (
    <div className="p-2  overflow-x-auto w-[83vw] h-[calc(var(--container-height)-75px)]">
      <div className="flex gap-3 font-medium">
        {tableHeader.map((header: string) => (
          <p>{header}</p>
        ))}
      </div>
      {orders.map(
        (order: { data: TOrderData; _id: string; file_id: string }) => (
          <p>{order.data.BUYER_EMAIL}</p>
        )
      )}
    </div>
  );
}
