import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BrainCircuit, CloudCog, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import { fixOrdersThunk } from "@/lib/redux/slices/thunks/fixOrdersThunk";
import { useRouter } from "next/navigation";
export default function OrdersMoreActions({
  dateRange,
  selectedChannelIds,
}: {
  dateRange: any;
  selectedChannelIds: any;
}) {
  const { orders } = useSelector(selectOrderSlice);
  const router = useRouter();

  const dispatch = useDispatch();
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
    localStorage.setItem(`invoice`, JSON.stringify(data));

    window.open("/invoice", "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} className=" rounded-full w-7 h-7" variant="ghost">
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button
              className="flex justify-between items-center w-full"
              onClick={() => dispatch(fixOrdersThunk(orders))}
            >
              Fix missing weight <CloudCog size={17} strokeWidth={1.5} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className="flex justify-between items-center w-full"
              onClick={calculateInvoice}
            >
              Generate Invoice <BrainCircuit strokeWidth={1.5} size={17} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
