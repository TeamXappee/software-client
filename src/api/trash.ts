export const fethSoftDeletedOrders = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/softDeleted`
  );
  const data = await res.json();
  return data.softDeletedOrders as any[];
};

export const restoreOrderFromTrash = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/restoreOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  const data = await res.json();
  return data.order;
};
