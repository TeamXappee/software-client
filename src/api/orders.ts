import { format } from "date-fns";

export const fetchOrders = async (
  fromDate: Date,
  toDate: Date,
  channelIds: number[]
) => {
  const from = format(fromDate, "yyyy-MM-dd");
  const to = format(toDate, "yyyy-MM-dd");

  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, channelIds }),
  });
};
