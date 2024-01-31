"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import PageTitle from "@/components/shared/pageTitle";
import { Button } from "../ui/button";
import { SelectChannel } from "./selectChannel";
import { IChannel } from "@/types/channel";
import { DownloadCloud } from "lucide-react";
import { DateRangePciker } from "./dateRangePicker";
import { useRenderToast } from "@/hooks/useRenderToast";
import { fetchOrders } from "@/api/orders";
import Spinner from "../ui/custom/spinner";
import OrderList from "../orders/orderList";
import { toast } from "sonner";

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


  const handleImportOrders = () => {
    // Define the promise function within the handleImportOrders function
    const importOrdersPromise = () =>
      new Promise(async (resolve, reject) => {
        if (
          importingStatus === "loading" ||
          !dateRange ||
          !dateRange.from ||
          !dateRange.to
        ) {
          reject("Invalid import conditions");
          return;
        }

        setImportingStatus("loading");
        try {
          const response = await fetchOrders(
            dateRange.from,
            dateRange.to,
            selectedChannelIds
          );
          if (response.ok) {
            const data = await response.json();
            setOrders(data.orders);
            resolve(data.orders);
          } else {
            throw new Error("Failed to import orders");
          }
        } catch (err) {
          console.log(err);
          reject(err);
        } finally {
          setImportingStatus("idle");
        }
      });

    toast.promise(importOrdersPromise, {
      loading: "Loading...",
      success: (orders: any) => {
        return `Imported ${orders.length} orders successfully!`;
      },
      error: "Error importing orders",
    });
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
              Import
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
      <OrderList orders={orders} />
    </div>
  );
}
