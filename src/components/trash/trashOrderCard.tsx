import React from "react";
import { format } from "date-fns";
import { ArchiveRestore, Delete, Dot, History, XOctagon } from "lucide-react";
import { ChannelLogo } from "../orders/customFields";
import { CardTitle } from "../orders/orderCard";
import { Button } from "../ui/button";
import { useDispatch } from "@/lib/redux/store";
import { restoreOrderThunk } from "@/lib/redux/slices/thunks/restoreOrderThunk";

export default function TrashOrderCard({
  order,
  index,
}: {
  order: any;
  index: number;
}) {
  const dispatch = useDispatch();
  return (
    <div className="group relative grid bg-secondary p-4 rounded-2xl">
      <div className="hidden group-hover:flex flex-col absolute right-0 top-0 m-2 z-30">
        <Button
          onClick={() => dispatch(restoreOrderThunk(order.id))}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full "
        >
          <History size={18} />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full  hover:bg-red-600/20 "
        >
          <XOctagon className="text-red-500" size={18} />
        </Button>
      </div>
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
          <CardTitle>order id </CardTitle>
          <span>{order.id}</span>
        </p>
        <p>
          <CardTitle>selro id</CardTitle>
          {order.selroOrderId}
        </p>
      </div>
    </div>
  );
}
