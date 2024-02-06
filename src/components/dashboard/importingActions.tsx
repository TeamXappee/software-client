import React from "react";
import { DateRangePicker } from "./dateRangePicker";
import { SelectChannel } from "./selectChannel";
import { Button } from "../ui/button";
import Spinner from "../ui/custom/spinner";
import { DownloadCloud } from "lucide-react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import { IChannel } from "@/types/channel";
import { DateRange } from "react-day-picker";
import { fetchOrdersThunk } from "@/lib/redux/slices/thunks/fetchOrdersthunk";

type Props = {
  channels: IChannel[];
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  selectedChannelIds: number[];
  setSelectedChannelIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ImportingActions(props: Props) {
  const { ordersStatus } = useSelector(selectOrderSlice);
  const dispatch = useDispatch();
  return (
    <section className="flex flex-col items-end gap-2">
      <DateRangePicker
        dateRange={props.dateRange}
        handleDateChange={props.setDateRange}
      />
      <SelectChannel
        selectedChannelIds={props.selectedChannelIds}
        setSelectedChannelIds={props.setSelectedChannelIds}
        channels={props.channels}
      />
      <Button
        onClick={() =>
          dispatch(
            fetchOrdersThunk({
              dateRange: props.dateRange,
              selectedChannelIds: props.selectedChannelIds,
            })
          )
        }
        disabled={ordersStatus === "loading"}
        className="gap-2 font-semibold"
      >
        Import
        {ordersStatus === "loading" ? (
          <Spinner />
        ) : (
          <DownloadCloud size={20} strokeWidth={2} />
        )}
      </Button>
    </section>
  );
}
