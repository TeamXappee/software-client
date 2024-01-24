import ClientList from "@/components/clients/clientList";

export default async function Clients() {
  const res = await fetch("http://localhost:8000/api/clients/all", {
    next: { tags: ["clients"] },
  });
  const data = await res.json();
  const clients = data.channels;
  return (
    <div className="p-6">
      <ClientList clients={clients} />
    </div>
  );
}
