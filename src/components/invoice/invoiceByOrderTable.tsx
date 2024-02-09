import { useSearchParams } from "next/navigation";
import React from "react";

export default function InvoiceByOrderTable({ orders }: { orders: any[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  return (
    <div className="w-full overflow-y-auto max-h-[100vh] pb-[15vh] ">
      <div className="grid  border w-full rounded-2xl px-3">
        <div className="grid grid-cols-11 gap-8 border-b text-muted-foreground font-semibold opacity-80 p-4">
          <h2 className=" col-span-2">Order ID</h2>
          <h2 className="col-span-2">Sku</h2>
          <h2 className=" col-span-2">Service</h2>
          <h2>Carrier</h2>
          <h2>Postage</h2>
          <h2>Handling</h2>
          <h2>Surge</h2>
          <h2>Packaging</h2>
        </div>
        {Object.entries(orders || {})
          .filter(([orderId, orderDetails]) => {
            if (query) {
              return orderId.includes(query) || orderDetails.carrier.toLowerCase().includes(query.toLowerCase());
            }
            return true;
          })
          .map(([orderId, orderDetails]: any) => (
            <div
              className="grid grid-cols-11 gap-8 border-b px-4 py-4"
              key={orderId}
            >
              <h2 className="col-span-2 font-semibold text-muted-foreground">
                {orderId}
              </h2>
              <p className="col-span-2">
                {orderDetails.items.map((item: any) => item.sku).join("+")}
              </p>
              <p className="col-span-2">{orderDetails.service}</p>
              <p className="mr-4 ">{orderDetails.carrier}</p>
              <p>
                £
                {parseFloat(
                  orderDetails.shippingCharge + orderDetails.postage
                ).toFixed(2)}
              </p>
              <p className="">
                £
                {parseFloat(
                  orderDetails.handling + orderDetails.addionalHandling
                ).toFixed(2)}
              </p>
              <p>0</p>
              <p>£{parseFloat(orderDetails.packaging).toFixed(2)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

{
  /* <ul>
                {orderDetails.items.map((item: any, index: any) => (
                  <li key={index}>
                    SKU: {item.sku}, Weight: {item.weight}, Class:{" "}
                    {item.itemClass}, Shipping Charge:{" "}
                    {orderDetails.shippingCharge}
                  </li>
                ))}
              </ul> */
}
