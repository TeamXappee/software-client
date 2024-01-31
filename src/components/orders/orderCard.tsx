import { format } from "date-fns";
import React from "react";
import { ChannelLogo, ServiceTitle, ShippedStatus } from "./customFields";
import { Dot } from "lucide-react";
import OrderItemList from "./orderItemList";
import Warning from "../ui/custom/warning";

export default function OrderCard({
  order,
  setWarnings,
}: {
  order: any;
  setWarnings: React.Dispatch<any>;
}) {
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
