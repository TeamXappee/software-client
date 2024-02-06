import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { ChannelLogo, ServiceTitle } from "./customFields";
import { ArrowRight, Asterisk, Dot } from "lucide-react";
import OrderItemList from "./orderItemList";
import Warning from "../ui/custom/warning";
import { OrderContextMenu } from "./orderContextMenu";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";

export default function OrderCard({
  order,
  index,
  length,
  carriers,
}: {
  order: any;
  index: number;
  length: number;
  carriers: any;
}) {
  const memoriezedOrder = useMemo(() => order, [order]);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  return (
    <>
      <ContextMenu
        modal={false}
        onOpenChange={() => setIsContextMenuOpen(!isContextMenuOpen)}
      >
        <ContextMenuTrigger className="text-sm grid grid-cols-4 gap-10 border border-t-0 p-4 relative overflow-x-hidden ">
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
              <p className="flex items-center">
                <Asterisk
                  size={18}
                  className={`text-primary ease-in-out duration-150  ${
                    !isContextMenuOpen && "-ml-8 mr-[.78rem]"
                  }`}
                />
                <CardTitle>order id </CardTitle>
                <span className={`${isContextMenuOpen && "text-primary"}`}>
                  {" "}
                  {order.id}
                </span>
              </p>
              <p>
                <CardTitle>selro id</CardTitle>
                {order.selroOrderId}
              </p>
            </div>
          </section>
          <section>
            <p className="font-bold flex items-center gap-2">
              {order.carrierName || "null"} {!order.carrierName && <Warning />}
            </p>
            <ServiceTitle service={order.shippingMethod} />
            <br />
            <p className="flex items-center gap-2">
              <CardTitle>total-weight</CardTitle> {order.totalWeight}{" "}
              {order.totalWeight <= 0 && <Warning />}
            </p>
            <p className="flex items-center gap-2">
              <CardTitle>postal-code</CardTitle>
              {order.shipPostalCode || "null"}
            </p>
          </section>
          <OrderItemList channelSales={order.channelSales} />
          <OrderContextMenu order={memoriezedOrder} carriers={carriers} />
        </ContextMenuTrigger>
      </ContextMenu>
    </>
  );
}

export const CardTitle = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className="text-muted-foreground font-medium">{children}: </span>
  );
};
