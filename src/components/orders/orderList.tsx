import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import OrderCard from "./orderCard";
import OrdersHeader, { OrderTypes } from "./ordersHeader";
import { calculateOrdersProblems } from "@/lib/helpers/ordersHelpers";
import { useSearchParams } from "next/navigation";

export default function OrderList({
  orders,
  page,
  setPage,
  ordersCount
}: {
  orders: any[];
  page: number;
  setPage: any;
  ordersCount: number;
}) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [orderTypes, setOrderTypes] = useState<OrderTypes>({
    pending: { count: 0, orders: [] },
    shipped: { count: 0, orders: [] },
    unshipped: { count: 0, orders: [] },
    cancelled: { count: 0, orders: [] },
    missing_weight: { count: 0, orders: [] },
    missing_carrier: { count: 0, orders: [] },
    missing_service: { count: 0, orders: [] },
  });

  useEffect(() => {
    setOrderTypes(calculateOrdersProblems(orders));
  }, [orders]);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        if (!searchQuery) return true;
        return (
          order.id.includes(searchQuery) ||
          order.selroOrderId?.includes(searchQuery) ||
          order.shipPostalCode?.includes(searchQuery) ||
          order.trackingNumber?.includes(searchQuery)
        );
      }),
    [orders, searchQuery]
  );

  return (
    <div>
      <div className="-mt-16">
        <OrdersHeader  ordersCount={ordersCount} orderTypes={orderTypes} />
      </div>
      {filteredOrders.length > 0 && (
        <div className="grid mt-6">
          <hr/>
          {filteredOrders.map((order, i) => (
            <OrderCard
              length={order?.length}
              page={page}
              setPage={setPage}
              index={i}
              order={order}
              key={order.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
