"use client";
import InvoiceByOrderTable from "@/components/invoice/invoiceByOrderTable";
import React, { useEffect, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ArrowRightLeft, X } from "lucide-react";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ToggleThemeBtn } from "@/components/shared/theme/toggleThemeBtn";
import ChannelsMetadata from "@/components/invoice/channelsMetadata";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import OrdersSearch from "@/components/orders/ordersSearch";

export default function Page() {
  const [invoice, setInvoice] = useState<any>({});
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    // Fetch data from localStorage
    const data = localStorage.getItem("invoice");
    if (data) {
      setInvoice(JSON.parse(data));
    }
  }, []);



  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[100vh] w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={11} maxSize={15}>
        <div className="flex justify-between items-start p-6">
          <ChannelsMetadata
            channelIds={invoice.channelIds}
            dateRange={{ from: invoice.from, to: invoice.to }}
          />
          <Image
            priority
            className={`text-center w-[125px]   -left-[6.4rem] relative top-[2px]`}
            src="/logo.png"
            alt="xappee"
            width="200"
            height="200"
          />

          <div>
            <div className="flex gap-2 items-start">
              <Button className="gap-2 rounded-xl " variant={"outline"}>
                Swich Invoice <ArrowRightLeft size={15} />
              </Button>
              <ToggleThemeBtn />
            </div>
            <OrdersSearch searchKey={"query"} ordersCount={1} />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="" />
      <ResizablePanel className=" overflow-y-auto" defaultSize={89}>
        <InvoiceByOrderTable orders={invoice.invoiceByOrder} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
