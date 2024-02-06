"use client";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import PageTitle from "@/components/shared/pageTitle";
import { IChannel } from "@/types/channel";
import OrderList from "../orders/orderList";
import { useSearchParams } from "next/navigation";
import { useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import OrderCategories from "../orders/orderCategories";
import ImportingActions from "./importingActions";
import Spinner from "../ui/custom/spinner";
import OrdersMoreActions from "./ordersMoreActions";

interface ImportContainerProps {
  channels: IChannel[];
  carriers: any[];
}

export default function ImportContainer({
  channels,
  carriers,
}: ImportContainerProps) {
  const memoriezedCarrierData = useMemo(() => carriers, [carriers]);

  const searchParams = useSearchParams();
  const rangeString = searchParams.get("range") || "";
  const initialRange = rangeString ? JSON.parse(rangeString||"") : undefined;

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialRange
  );
  const [selectedChannelIds, setSelectedChannelIds] = useState<number[]>([]);
  const { ordersCount, ordersStatus } = useSelector(selectOrderSlice);

  return (
    <div className="p-4">
      <div className="flex justify-between min-h-[175px]">
        <section>
          <div className="flex  items-center gap-2">
            <PageTitle>Import new orders</PageTitle>
            <OrdersMoreActions
              dateRange={dateRange}
              selectedChannelIds={selectedChannelIds}
            />
            {ordersStatus === "loading" && <Spinner />}
          </div>

          {ordersCount && ordersCount > 0 ? (
            <div className="flex gap-2 items-center">
              <p className="text-muted-foreground text-sm">{`${ordersCount} orders imported.`}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No orders imported.</p>
          )}
        </section>

        <ImportingActions
          channels={channels}
          dateRange={dateRange}
          selectedChannelIds={selectedChannelIds}
          setDateRange={setDateRange}
          setSelectedChannelIds={setSelectedChannelIds}
        />
      </div>
      <OrderCategories />
      <OrderList carriers={memoriezedCarrierData} />
    </div>
  );
}
