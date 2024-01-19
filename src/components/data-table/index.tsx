import React from "react";
import Cell from "./cell";
import { Button } from "../ui/button";

export default function DataTableContainer({
  orders,
  handleNextPage,
  handlePreviousPage,
  pageIndex,
  PAGE_SIZE,
  selectedColumnsHeaders
}: {
  orders: any;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  pageIndex: number;
  selectedColumnsHeaders: string[];
  PAGE_SIZE: number;
}) {
  if (!orders) {
    return <p>No data available for view</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto pretty-scrollbar max-h-[calc(var(--container-height)-100px)]">
        <table className="min-w-full border-collapse border border-input ">
          <thead>
            <tr className=" text-left">
              {selectedColumnsHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`border border-input font-medium p-2  text-muted-foreground
              
              ${header === "TITLE" && "min-w-[350px]"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.slice(pageIndex, (pageIndex + PAGE_SIZE)).map((order: any, index: any) => (
              <tr key={order._id || index}>
                {selectedColumnsHeaders.map((header, i) => (
                  <Cell key={i} order={order} header={header} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end p-4 gap-4 items-center">
        <Button
          onClick={handlePreviousPage}
          disabled={pageIndex === 0}
          variant={"ghost"}
        >
          Previous
        </Button>
        <p>{pageIndex / 17 + 1}</p>
        <Button
          disabled={orders.length < 17}
          onClick={handleNextPage}
          variant={"ghost"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
