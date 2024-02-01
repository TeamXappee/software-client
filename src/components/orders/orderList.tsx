import React, { SetStateAction, useEffect, useState } from "react";
import OrderCard from "./orderCard";
import OrdersHeader from "./ordersHeader";
import { calculateOrdersProblems } from "@/lib/helpers/ordersHelpers";
import { useSearchParams } from "next/navigation";

export default function OrderList({
  orders,
  page,
  setPage,
}: {
  orders: any[];
  page: number;
  setPage: any;
}) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [warnings, setWarnings] = useState({
    weight: 0,
    carrier: 0,
  });

  const [orderTyeps, setOrderTypes] = useState<any>({
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
    console.log(orderTyeps);
  }, [orders]);

  return (
    <div className="">
      <div className="-mt-16">
        <OrdersHeader orderTyeps={orderTyeps} />
      </div>
      <hr />
      {orders.length > 0 && (
        <div className="grid">
          {orders
            .filter((order) => {
              if (searchQuery === "") return true;
              if (order.id.includes(searchQuery)) return true;
              if (order.selroOrderId?.includes(searchQuery)) return true;
              if (order.shipPostalCode?.includes(searchQuery)) return true;
              if (order.trackingNumber?.includes(searchQuery)) return true;
              return false;
            })
            .map((order, i) => (
              <OrderCard
                length={order?.length}
                page={page}
                setPage={setPage}
                index={i}
                setWarnings={setWarnings}
                order={order}
                key={order.id}
              />
            ))}
        </div>
      )}
    </div>
  );
}
