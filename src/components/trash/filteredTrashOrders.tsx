import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../ui/custom/spinner";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import TrashOrderCard from "../trash/trashOrderCard";

export default function FilteredTrashOrders({ orders }: { orders: any }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("trash-query") || "";
  const category = searchParams.get("trash-category") || null;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery || category) {
      setIsLoading(true);
      // Simulate a delay to show the spinner, then set loading to false
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 50); // Adjust delay as needed

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
        <div className="mt-4 grid grid-cols-4 gap-2">
          {filteredOrders.map((order: any, i: number) => (
            <TrashOrderCard index={i} order={order} key={order.id + "-trash"} />
          ))}
          {filteredOrders.length > 20 && (
            <div className="flex justify-end mt-4">
              <Button
                variant="ghost"
                className="flex items-stretch gap-2 group"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to top
                <ChevronUp
                  className="group-hover:-mt-3 duration-300 ease-in-out"
                  size={20}
                />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-[40vh] text-muted-foreground">
          No results found.
        </div>
      )}
    </>
  );
}
