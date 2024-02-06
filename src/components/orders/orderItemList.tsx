import React from "react";
import { CardTitle } from "./orderCard";
import { ShippedStatus } from "./customFields";
import { Dot, UploadCloud } from "lucide-react";
import { NewItemsDialog } from "../items/newItemsDialog";
import { NewItemFromSku } from "./newItemFromsku";

export default function OrderItemList({
  channelSales,
}: {
  channelSales: any[];
}) {
  const itemsLength = channelSales.length;
  return (
    <section
      className={`space-y-2 col-span-2  max-h-[125px] overflow-y-auto pretty-scrollbar`}
    >
      {itemsLength > 1 && (
        <p className="font-bold text-xs flex items-center -ml-2">
          <Dot size={20} className="text-primary" />
          {itemsLength} {itemsLength > 1 ? "Items" : "Item"}
        </p>
      )}
      <ol className="grid gap-2">
        {channelSales.map((sale: any, i: number) => (
          <li key={i} className="">
            <p className="text-xs flex items-start">
              {itemsLength > 1
                ? `${i + 1}. ` + sale.customItemTitle
                : sale.customItemTitle}
            </p>
            <div className="grid grid-cols-2 mt-1">
              <div>
                <p className="flex items-center gap-2">
                  <CardTitle>SKU</CardTitle>
                  {sale.sku}
                  {!sale.weight && <NewItemFromSku item={sale} />}
                </p>
                <p>
                  <CardTitle>tracking number</CardTitle>
                  {sale.trackingNumber}
                </p>
                <ShippedStatus status={sale.orderStatus} />
              </div>
              <div>
                <CardTitle>weight</CardTitle>
                {sale.weight}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
