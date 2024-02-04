import { IOrderTypes } from "@/types/order";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dot } from "lucide-react";

export type OrderTypes = {
  pending: { count: number; orders: any[] };
  shipped: { count: number; orders: any[] };
  unshipped: { count: number; orders: any[] };
  cancelled: { count: number; orders: any[] };
  missing_weight: { count: number; orders: any[] };
  missing_carrier: { count: number; orders: any[] };
  missing_service: { count: number; orders: any[] };
};

export default function OrdersHeader({
  orderTypes,
  ordersCount,
}: {
  orderTypes: OrderTypes;
  ordersCount: number;
}) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(searchQuery);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("query", query);
    router.replace(`${pathname}?${params.toString()}`);
  }, [query]);

  return (
    <div className="relative flex items-center -top-[1.45rem] -mb-[2rem]  gap-2 w-[75%]">
      <div className="flex flex-wrap gap-1">
        {Object.entries(orderTypes).map(
          ([key, { count }]) =>
            count > 0 && (
              <OrderTypeCard key={key} className={`bg-secondary`}>
                {`${key.replace("_", " ")} ${count}`}
              </OrderTypeCard>
            )
        )}
      </div>

      {ordersCount > 0 && (
        <>
          <Dot className="text-primary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="max-w-[225px] rounded-xl"
          />
        </>
      )}
    </div>
  );
}

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
