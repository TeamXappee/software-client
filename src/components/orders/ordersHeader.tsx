import { IOrderTypes } from "@/types/order";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrdersHeader({ orderTyeps }: { orderTyeps: any }) {
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
    <div className="relative -top-[3.5rem] -mb-[2rem] grid gap-2 w-[75%]">
      <div className="flex flex-wrap gap-1">
        <OrderTypeCard className="bg-green-400/30">
          Shipped {orderTyeps.shipped.count}
        </OrderTypeCard>
        <OrderTypeCard className="bg-orange-400/40">
          Unshipped {orderTyeps.unshipped.count}
        </OrderTypeCard>
        <OrderTypeCard className="bg-red-400/50">
          Cancelled {orderTyeps.cancelled.count}
        </OrderTypeCard>
        <OrderTypeCard className="bg-yellow-400/30">
          Missing carrier {orderTyeps.missing_carrier.count}
        </OrderTypeCard>
        <OrderTypeCard className="bg-yellow-400/30">
          Missing service {orderTyeps.missing_service.count}
        </OrderTypeCard>
        <OrderTypeCard className="bg-yellow-400/30">
          Missing weight {orderTyeps.missing_weight.count}
        </OrderTypeCard>
      </div>
      <div className=" flex gap-2 items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className=" max-w-[225px] "
        />
      </div>
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
