import React, { useEffect, useState } from "react";
import { calculateOrdersProblems } from "@/lib/helpers/ordersHelpers";
import { useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import { cn } from "@/lib/utils";
import { OrderTypes } from "@/types/order";
import OrdersSearch from "./ordersSearch";
import { useParams } from "@/hooks/useSearchParams";

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

export default function OrderCategories({
  categoryKey,
  searchKey,
  orders,
  ordersCount,
}: {
  categoryKey: string;
  searchKey: string;
  orders: any;
  ordersCount: number;
}) {
  const { setParam, removeParam, getParam } = useParams();
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
      removeParam(categoryKey);
    } else {
      setActiveCategory(key);
      setParam(categoryKey, key);
    }
  };

  useEffect(() => {
    const actifeformparam = getParam(categoryKey);
    setActiveCategory(actifeformparam);
  }, []);

  return (
    <div className="relative flex items-start gap-2 w-full">
      <div className="flex flex-wrap gap-2 w-full">
        <button
          onClick={() => {
            removeParam(categoryKey);
            setActiveCategory("");
          }}
        >
          <OrderTypeCard
            className={` ${activeCategory === "" && "bg-primary text-white"} `}
          >
            {`All`}
          </OrderTypeCard>
        </button>
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
        <OrdersSearch searchKey={searchKey} ordersCount={ordersCount} />
      </div>
    </div>
  );
}
