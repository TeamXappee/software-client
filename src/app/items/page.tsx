"use client";
import { ItemsTable } from "@/components/items/itemsTable";
import { NewItemsDialog } from "@/components/items/newItemsDialog";
import PageTitle from "@/components/shared/pageTitle";
import { Button } from "@/components/ui/button";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Loader2, PackagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Items() {
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
    // Initial data fetch when the component mounts
    fetchMoreData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <PageTitle>Items</PageTitle>
        <NewItemsDialog />
      </div>
      <div>
        <ItemsTable data={items} />
        {isFetching && (
          <div className="flex items-center w-full justify-center p-4">
            <Button variant="ghost" disabled>
              <Loader2 className="animate-spin" size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
