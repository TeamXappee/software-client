"use client";
import React, { useEffect, useState } from "react";
import { ItemsTable } from "@/components/items/itemsTable";
import { Button } from "@/components/ui/button";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";

export default function ItemsContainer() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    // Simulated API call to fetch more items (e.g., from a backend server)
    const response = await fetch(
      `http://localhost:8000/api/items?page=${page}&pageSize=20`
    );
    const newData = await response.json();

    // Update the items and page
    setItems([...items, ...newData.items]);
    setPage(page + 1);
  };

  const isFetching = useInfiniteScroll(fetchMoreData);

  useEffect(() => {
    fetchMoreData();
  }, [isFetching]);

  return (
    <div>
      <ItemsTable isFetching={isFetching} data={items} />
      {isFetching && (
        <div className="flex items-center w-full justify-center p-4">
          <Button variant="ghost" disabled>
            <Loader2 className="animate-spin" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
