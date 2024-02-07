import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrdersSearch({
  ordersCount,
  searchKey,
}: {
  ordersCount: number | undefined;
  searchKey: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchQuery = searchParams.get(searchKey) || "";
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set(searchKey, query);
    router.replace(`${pathname}?${params.toString()}`, undefined);
  }, [query]);

  return (
    <>
      {ordersCount && ordersCount > 0 ? (
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="max-w-[225px] rounded-xl"
        />
      ) : (
        <></>
      )}
    </>
  );
}
