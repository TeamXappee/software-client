import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrdersSearch({
  ordersCount,
}: {
  ordersCount: number | undefined;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("query", query);
    router.replace(`${pathname}?${params.toString()}`, undefined);
  }, [query]);

  return (
    <>
      {ordersCount && ordersCount > 0 ? (
        <>
          <Dot className="text-primary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="max-w-[225px] rounded-xl"
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
