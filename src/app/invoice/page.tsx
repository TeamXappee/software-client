"use client";
import React from "react";

export default function Page() {
  const [invoice, setInvoice] = React.useState<any>(undefined);

  React.useEffect(() => {
    const invoiceString = localStorage.getItem("invoice");
    const loadedInvoice = invoiceString ? JSON.parse(invoiceString) : undefined;
    setInvoice(loadedInvoice);
  }, []);

  if (!invoice) {
    return <p>No invoice data</p>;
  }

  const invoiceErrors = invoice.errors;
  const carrierInvoice = Object.entries(invoice.carrierFeesMap || {}).reduce(
    (newRecord: any, [key, value]) => {
      newRecord[key] = value;
      return newRecord;
    },
    {}
  );

  console.log(carrierInvoice);

  return (
    <div className="p-4">
      <section className="flex justify-between">
        <h1 className="font-medium text-xl">INVOICE</h1>
        <div className="flex gap-2">
          <p
            className={`flex items-center justify-center py-1 px-2 font-medium rounded-2xl 
            ${invoiceErrors ? "bg-red-500/40" : "bg-green-500/40"}`}
          >
            {invoiceErrors ? `Errors ${invoiceErrors}` : "No errors"}
          </p>
        </div>
      </section>
      <section className="max-w-[450px] grid gap-2 mt-4">
        {Object.entries(carrierInvoice).map(([key, value]: any) => (
          <div className="grid grid-cols-2" key={key}>
            <p>{key}</p>
            <p>{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
