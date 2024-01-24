"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type TClient = {
  id: number;
  name: string;
  type: string;
  enable: boolean;
  downloadCatalogue: boolean;
  downloadOrders: boolean;
  lastCatalogueDownloadTime: number;
  lastOrderDownloadTime: number;
};
export default function ClientList({ clients }: { clients: TClient[] }) {
  return (
    <div className=" grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-2">
      {clients?.map((client) => (
        <div className="bg-secondary rounded-lg p-4 hover:bg-secondary/70 ">
          <Link href={`/fulfillment/client/${client.id}/files`}>
            <p className="font-bold text-xl">{client.name}</p>
            <p className="text-base text-muted-foreground font-medium">
              {client.type}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
