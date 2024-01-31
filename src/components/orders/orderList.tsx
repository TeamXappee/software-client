import React, { useState } from "react";
import OrderCard from "./orderCard";

export default function OrderList({ orders }: { orders: any[] }) {
  const [warnings, setWarnings] = useState({
    weight: 0,
    carrier: 0,
  });

  return (
    <div className="">
      {orders.length > 0 && (
        <>
          {/* <h2 className="font-medium text-lg py-4">Orders</h2> */}
          <div className="grid">
            {orders.map((order) => (
              <OrderCard
                setWarnings={setWarnings}
                order={order}
                key={order.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
