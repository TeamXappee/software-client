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
          <p className="font-bold text-xl">{client.name}</p>
          <p className="text-lg text-muted-foreground font-bold">{client.type}</p>
        </div>
      ))}
    </div>
  );
}
