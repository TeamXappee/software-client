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
    <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-2 p-6">
    {Array(15)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="w-full h-full p-6 bg-input  rounded-lg animate-pulse"
        ></div>
      ))}
  </div>
  );
}
