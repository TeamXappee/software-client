import React from "react";
import { Button } from "../ui/button";
import { PackagePlusIcon } from "lucide-react";
export default function Invoice({ fileId }: { fileId: string | undefined }) {
  const handleCalculateInvoice = async () => {
    console.log(fileId)
    if (!fileId) return;
    const res = await fetch(
      `http://localhost:8000/api/invoices/calculate?file_id=${fileId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <Button
      onClick={handleCalculateInvoice}
      variant={"outline"}
      className="gap-2 mr-6 h-8  rounded-lg"
    >
      Invoice <PackagePlusIcon size={15} />
    </Button>
  );
}
