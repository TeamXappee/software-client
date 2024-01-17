import React, { useState } from "react";

export default function Cell({ order, header }: { order: any; header: any }) {
  const ordersData = order.data ? order.data[header] : order[header];
  const [value, setValue] = useState(ordersData || "");
  return (
    <td key={header} className="border border-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`p-2 bg-transparent w-full focus:outline-none focus:bg-input ${
          value.length > 14 && "min-w-[250px]"
        } ${value.length > 20 && "min-w-[350px]"}`}
      />
    </td>
  );
}
