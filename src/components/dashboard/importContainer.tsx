"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import PageTitle from "@/components/shared/pageTitle";
import { Button } from "../ui/button";
import { SelectChannel } from "./selectChannel";
import { IChannel } from "@/types/channel";
import { DownloadCloud, Loader2 } from "lucide-react";
import { DateRangePciker } from "./dateRangePicker";
import { useRenderToast } from "@/hooks/useRenderToast";
import { fetchOrders } from "@/api/orders";
import Spinner from "../ui/custom/spinner";

interface ImportContainerProps {
  channels: IChannel[];
}

export default function ImportContainer({ channels }: ImportContainerProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const ordersLength = orders.length;
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedChannelIds, setSelectedChannelIds] = useState<number[]>([]);
  const [importingStatus, setImportingStatus] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");

  console.log(orders)
  const handleImportOrders = async () => {
    if (
      importingStatus === "loading" ||
      !dateRange ||
      !dateRange.from ||
      !dateRange.to
    )
      return;

    setImportingStatus("loading");
    useRenderToast("Loading...", "loading");

    try {
      const response = await fetchOrders(
        dateRange.from,
        dateRange.to,
        selectedChannelIds
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);

        if (ordersLength > 0) {
          useRenderToast(
            `${ordersLength} Orders imported successfully.`,
            "success"
          );
        }
        if (data.duplicateCount) {
          useRenderToast(
            `${data.duplicateCount} Orders were already imported.`,
            "error"
          );
        }
      } else {
        throw new Error("Failed to import orders");
      }
    } catch (err) {
      useRenderToast("Something went wrong", "error");
    } finally {
      setImportingStatus("idle");
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex justify-between min-h-[175px]">
        <section>
          <PageTitle>Import new orders</PageTitle>
          <p className="text-muted-foreground text-sm">
            {ordersLength > 0
              ? `${ordersLength} orders imported.`
              : `No orders imported.`}
          </p>
        </section>
        <section>
          <div className="flex flex-col items-end gap-2">
            <DateRangePciker handleDateChange={setDateRange} />
            <SelectChannel
              selectedChannelIds={selectedChannelIds}
              setSelectedChannelIds={setSelectedChannelIds}
              channels={channels}
            />
            <Button
              onClick={handleImportOrders}
              disabled={importingStatus === "loading"}
              className="gap-2 font-semibold"
            >
              Import{" "}
              {importingStatus === "loading" ? (
                <Spinner />
              ) : (
                <DownloadCloud size={20} strokeWidth={2} />
              )}
            </Button>
          </div>
        </section>
      </div>
      <hr />
      <div>
        <h2 className="font-medium text-lg py-4">Orders</h2>
        <div className="grid grid-cols-5 gap-2">
          {orders.map((order) => (
            <div className="bg-secondary hover:bg-muted  overflow-x-auto pretty-scrollbar p-2 rounded-lg text-sm ">
              <p>{new Date(order.date).toDateString()}</p>
              <p className="font-bold">{order.selroChannelName}</p>
              <p>{order.carrierName || "No Carrier"}</p>
              <p className="text-xs text-muted-foreground">
                {order.selroOrderId}
              </p>
              <p className="mt-1">
                {order.trackingNumber || "No Tracking Number"}
              </p>
              <p>
                {order.shippingMethod?.includes("|")
                  ? order.shippingMethod.split("|")[1]
                  : order.shippingMethod}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
