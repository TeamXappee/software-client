import { format } from "date-fns";
import { cache } from "react";

export const fetchOrders = cache(
  async (fromDate: Date, toDate: Date, channelIds: number[]) => {
    if (!fromDate || !toDate) return;
    const from = format(fromDate, "yyyy-MM-dd");
    const to = format(toDate, "yyyy-MM-dd");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, channelIds }),
      }
    );
    const data = await res.json();
    return data.orders as any[];
  }
);

export const softDeleteOrder = async (order: any, originalIndex: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/softDelete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order, originalIndex }),
    }
  );
  const data = await res.json();
  return data.softDeletedOrder as any;
};
