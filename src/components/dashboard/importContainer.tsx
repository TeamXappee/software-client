"use client";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import PageTitle from "@/components/shared/pageTitle";
import { IChannel } from "@/types/channel";
import { useSearchParams } from "next/navigation";
import { useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import OrderCategories from "../orders/orderCategories";
import ImportingActions from "./importingActions";
import Spinner from "../ui/custom/spinner";
import OrdersMoreActions from "./ordersMoreActions";
import { TrashSheet } from "../trash/trashSheet";
import FilteredOrdersList from "../orders/filteredOrders";

interface ImportContainerProps {
  channels: IChannel[];
  carriers: any[];
}

export default function ImportContainer({
  channels,
  carriers,
}: ImportContainerProps) {
  const { orders } = useSelector(selectOrderSlice);

  const memoriezedOrders = useMemo(() => orders, [orders]);
  const memoriezedCarrierData = useMemo(() => carriers, [carriers]);

  const searchParams = useSearchParams();
  const rangeString = searchParams.get("range") || "";
  const initialRange = rangeString ? JSON.parse(rangeString || "") : undefined;

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialRange
  );
  const [selectedChannelIds, setSelectedChannelIds] = useState<number[]>([]);
  const { ordersCount, ordersStatus } = useSelector(selectOrderSlice);

  return (
    <div className="p-4">
      <div className="flex justify-between sticky top-0 bg-background py-2  min-h-[115px] z-20 ">
        <section className="w-full">
          <div className="flex  items-center gap-2">
            <PageTitle>
              <span id="import">Orders</span>
            </PageTitle>
            <OrdersMoreActions
              dateRange={dateRange}
              selectedChannelIds={selectedChannelIds}
            />
            {ordersStatus === "loading" && <Spinner />}
          </div>

          {ordersCount && ordersCount > 0 ? (
            <div className="flex gap-2  flex-col">
              <p className="text-muted-foreground text-sm">{`${ordersCount} orders imported.`}</p>
              <div className="space-y-2 ">
                <OrderCategories
                  orders={memoriezedOrders}
                  ordersCount={ordersCount}
                  categoryKey="category"
                  searchKey="query"
                />
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No orders imported.</p>
          )}
        </section>

        <div className="flex flex-col items-end gap-4">
          <ImportingActions
            channels={channels}
            dateRange={dateRange}
            selectedChannelIds={selectedChannelIds}
            setDateRange={setDateRange}
            setSelectedChannelIds={setSelectedChannelIds}
          />
          <TrashSheet />
        </div>
      </div>
      <FilteredOrdersList
        orders={memoriezedOrders}
        carriers={memoriezedCarrierData}
      />
    </div>
  );
}
