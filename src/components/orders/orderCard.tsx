import { format } from "date-fns";
import React, { SetStateAction, useEffect, useRef } from "react";
import { ChannelLogo, ServiceTitle, ShippedStatus } from "./customFields";
import { Dot } from "lucide-react";
import OrderItemList from "./orderItemList";
import Warning from "../ui/custom/warning";

export default function OrderCard({
  order,
  setWarnings,
  index,
  page,
  setPage,
  length,
}: {
  order: any;
  setWarnings: React.Dispatch<any>;
  index: number;
  page: number;
  setPage: any;
  length: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && index === length - 5) {
          setPage((prevPage: any) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [index, page, setPage]);

  return (
    <div className="text-sm grid grid-cols-4 gap-10 border border-t-0 p-4">
      <section className="space-y-2 col-span-1">
        <div className="opacity-80 text-sm flex items-center">
          <p>{format(new Date(order.date), "yyyy-MM-dd")}</p>
          <Dot size={20} className="text-primary" />
          <p>{format(new Date(order.date), "hh:mm:ss")}</p>
        </div>
        <div>
          <p className="font-bold">{`(${order.selroChannelName})`}</p>
          <ChannelLogo channel={order.channel} />
        </div>
        <div>
          <p>
            <CardTitle>order id</CardTitle>
            {order.id}
          </p>
          <p>
            <CardTitle>selro id</CardTitle>
            {order.selroOrderId}
          </p>
        </div>
      </section>
      <section>
        <p className="font-bold flex items-center gap-2">
          {order.carrierName || "null"}{" "}
          {!order.carrierName && (
            <Warning warning={"carrier"} setWarnings={setWarnings} />
          )}
        </p>
        <ServiceTitle
          setWarnings={setWarnings}
          service={order.shippingMethod}
        />
        <br />
        <p className="flex items-center gap-2">
          <CardTitle>total-weight</CardTitle> {order.totalWeight}{" "}
          {order.totalWeight <= 0 && (
            <Warning warning={"weight"} setWarnings={setWarnings} />
          )}
        </p>
        <p className="flex items-center gap-2">
          <CardTitle>postal-code</CardTitle>
          {order.shipPostalCode || "null"}
        </p>
      </section>
      <OrderItemList channelSales={order.channelSales} />
    </div>
  );
}

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className="text-muted-foreground font-medium">{children}: </span>
  );
};
