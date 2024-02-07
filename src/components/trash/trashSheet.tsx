import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";
import OrderCategories from "../orders/orderCategories";
import FilteredTrashOrders from "./filteredTrashOrders";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { selectOrderSlice } from "@/lib/redux/slices/orderSlice";
import { useEffect } from "react";
import { fetchSoftDeletedOrdersThunk } from "@/lib/redux/slices/thunks/fetchSoftDeletedOrdersThunk";

export function TrashSheet() {
  const { trash, trashStatus } = useSelector(selectOrderSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (trashStatus === "idle") {
      dispatch(fetchSoftDeletedOrdersThunk());
    }
  }, [trashStatus]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className=" rounded-xl dark:bg-red-500/60 bg-red-500 hover:bg-red-500/80 flex items-center gap-2">
          Trash <Trash2 size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[60vw] max-h-[100vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Trash</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <OrderCategories
            orders={trash}
            ordersCount={trash.length}
            categoryKey="trash-category"
            searchKey="trash-query"
          />
          <FilteredTrashOrders orders={trash} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
