import ItemsContainer from "@/components/items";
import { NewItemsDialog } from "@/components/items/newItemsDialog";
import PageTitle from "@/components/shared/pageTitle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/custom/spinner";
import { PackagePlus } from "lucide-react";
import { Suspense } from "react";

export default function Items() {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <PageTitle>Items</PageTitle>
        <NewItemsDialog/>
      </div>
      <ItemsContainer />
    </div>
  );
}
