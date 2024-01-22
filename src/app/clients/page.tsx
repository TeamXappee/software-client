import { AddNewclient } from "@/components/clients/addNewClient";
import ClientList from "@/components/clients/clientList";
import PageTitle from "@/components/shared/pageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, PlusCircle, Search, SearchCheck, User } from "lucide-react";
import React, { useEffect } from "react";

export default async function Clients() {
  const res = await fetch("http://localhost:8000/api/clients/all", {
    next: { tags: ["clients"] },
  });
  const data = await res.json();
  const clients = data.channels.channels;
  return (
    <div className="p-6">
      <section className="flex justify-between gap-2 ">
        <PageTitle>
          Clients <User size={20} />
        </PageTitle>
        <div className="flex  items-center gap-2">
          <div className="relative flex items-center">
            <Input
              placeholder="Search..."
              className="max-w-[320px] rounded-2xl"
            />
            <Search
              size={15}
              className="absolute right-2 text-muted-foreground"
            />
          </div>
          <AddNewclient />
        </div>
      </section>
      <section className="mt-4">
        <ClientList clients={clients} />
      </section>
    </div>
  );
}
