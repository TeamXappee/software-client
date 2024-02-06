import React, { useEffect, useMemo, useState } from "react";
import OrderCard from "./orderCard";
import { useSearchParams } from "next/navigation";
import { useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import Spinner from "../ui/custom/spinner";

export default function OrderList({ carriers }: { carriers: any[] }) {
  const { orders } = useSelector(selectOrderSlice);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const category = searchParams.get("category") || null;
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state on search query or category change
  useEffect(() => {
    if (searchQuery || category) {
      setIsLoading(true);
      // Simulate a delay to show the spinner, then set loading to false
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timer);
    }
  }, [searchQuery, category]);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order: any) => {
        const matchesSearchQuery = searchQuery
          ? order.id.includes(searchQuery) ||
            order.selroOrderId?.includes(searchQuery) ||
            order.shipPostalCode?.includes(searchQuery) ||
            order.trackingNumber?.includes(searchQuery)
          : true;

        // Filter by category if category is not null
        const matchesItemCategory = category
          ? order.channelSales?.some((channelSale: any) =>
              category === "shipped"
                ? channelSale.orderStatus === "Shipped"
                : category === "cancelled"
                ? channelSale.orderStatus === "Canceled"
                : category === "unshipped"
                ? channelSale.orderStatus === "Unshipped"
                : true
            )
          : true;

        const matchOrdercategory =
          category === "missing_weight"
            ? order.totalWeight === 0
            : category === "missing_carrier"
            ? !order.carrierName && true
            : category === "missing_service"
            ? !order.shippingMethod && true
            : true;

        return matchesSearchQuery && matchesItemCategory && matchOrdercategory;
      }),
    [orders, searchQuery, category]
  );

  filteredOrders.sort((a: any, b: any) =>
    a.selroOrderId > b.selroOrderId ? 1 : -1
  );

  return (
    <>
      {isLoading ? (
       <div className="grid place-content-center mt-[40vh]">
         <Spinner />
       </div>
      ) : filteredOrders.length > 0 ? (
        <div className="grid mt-6">
          <hr />
          {filteredOrders.map((order: any, i: number) => (
            <OrderCard
              carriers={carriers}
              length={order?.length}
              index={i}
              order={order}
              key={order.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-[40vh] text-muted-foreground">No results found.</div>
      )}
    </>
  );
}
