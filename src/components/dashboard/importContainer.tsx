"use client";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import PageTitle from "@/components/shared/pageTitle";
import { Button } from "../ui/button";
import { SelectChannel } from "./selectChannel";
import { IChannel } from "@/types/channel";
import { DownloadCloud } from "lucide-react";
import { DateRangePicker } from "./dateRangePicker";
import { fetchOrders } from "@/api/orders";
import Spinner from "../ui/custom/spinner";
import OrderList from "../orders/orderList";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface ImportContainerProps {
  channels: IChannel[];
}

export default function ImportContainer({ channels }: ImportContainerProps) {
  const searchParams = useSearchParams();
  const rangeString = searchParams.get("range");
  const initialRange = rangeString ? JSON.parse(rangeString) : undefined;

  const [orders, setOrders] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialRange
  );
  const [selectedChannelIds, setSelectedChannelIds] = useState<number[]>([]);
  const [importingStatus, setImportingStatus] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");
  const [page, setPage] = useState(1);
  const pagesize = 20;

  // useEffect(() => {
  //   if (page > 1) {
  //     handleImportOrders();
  //   }
  // }, [page, dateRange, selectedChannelIds]);

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
            selectedChannelIds,
            page,
            pagesize
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

  const calculateInvoice = async () => {
    const res = await fetch(
      "http://localhost:8000/api/orders/calculateInvoice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: dateRange?.from,
          to: dateRange?.to,
          channelIds: selectedChannelIds,
        }),
      }
    );
    const data = await res.json();
    console.log(data.processedOrders || "no");
  };
  return (
    <div className="p-4">
      <div className="flex justify-between min-h-[175px]">
        <section>
          <PageTitle>Import new orders</PageTitle>
          <p className="text-muted-foreground text-sm">
            {orders.length > 0
              ? `${orders.length} orders imported.`
              : "No orders imported."}
          </p>
        </section>
        <section>
          <div className="flex flex-col items-end gap-2">
            <DateRangePicker
              dateRange={dateRange}
              handleDateChange={setDateRange}
            />
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
      <OrderList page={page} setPage={setPage} orders={orders} />
    </div>
  );
}
