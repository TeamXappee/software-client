import React, { useEffect, useState } from "react";
import { calculateOrdersProblems } from "@/lib/helpers/ordersHelpers";
import { useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import { cn } from "@/lib/utils";
import { OrderTypes } from "@/types/order";
import OrdersSearch from "./ordersSearch";

const OrderTypeCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "bg-secondary p-2 rounded-xl text-muted-foreground font-medium text-sm cursor-default",
        className
      )}
    >
      {children}
    </p>
  );
};

export default function OrderCategories() {
  const { orders, ordersCount } = useSelector(selectOrderSlice);

  const [activeCategory, setActiveCategory] = useState<string | null>();

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

  const handleToggleCategory = (key: string) => {
    if (activeCategory === key) {
      setActiveCategory(null);
    } else {
      setActiveCategory(key);
    }
  };

  return (
    <div className="-mt-[3.8rem]">
      <div className="relative flex items-center -top-[1.45rem] -mb-[2rem]  gap-2 w-[75%]">
        <div className="flex flex-wrap gap-1">
          {Object.entries(orderTypes).map(
            ([key, { count }]) =>
              count > 0 && (
                <button key={key} onClick={() => handleToggleCategory(key)}>
                  <OrderTypeCard
                    className={` ${
                      activeCategory === key && "bg-primary text-white"
                    }`}
                  >
                    {`${key.replace("_", " ")} ${count}`}
                  </OrderTypeCard>
                </button>
              )
          )}
        </div>
        <OrdersSearch ordersCount={ordersCount} />
      </div>
    </div>
  );
}
