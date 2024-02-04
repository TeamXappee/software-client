import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDown, ChevronDown, PackagePlus, UploadCloud } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import NewItem from "./newItem";

const getNewInitialItemValue = () => ({
  sku: "",
  items: undefined,
  parcels: undefined,
  length: undefined,
  width: undefined,
  height: undefined,
  weight: undefined,
  class: "",
  maxParcels: undefined,
});

export function NewItemsDialog() {
  const [newItems, setNewItems] = useState([getNewInitialItemValue()]);

  const handleValueChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const list: any = [...newItems];
    list[index][name] = value;
    setNewItems(list);
  };

  const handleAddNewRow = () => {
    setNewItems((prev: any) => [...prev, getNewInitialItemValue()]);
  };

  const handleRemoveRow = (index: number) => {
    if (index === 0 && newItems.length === 1) return;
    setNewItems((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleSubmitNewItems = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/items/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newItems: newItems }),
    });
    const data = await res.json();
    console.log(data, "done");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="gap-2 font-semibold">
          New Items <PackagePlus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75vw]">
        <DialogHeader>
          <DialogTitle className="flex gap-1 ">
            <PackagePlus size={17} /> New Items
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmitNewItems}
          className="flex flex-col items-end "
        >
          <div className="h-[60vh] overflow-y-auto pretty-scrollbar p-4 space-y-1">
            {newItems.map((item, index) => (
              <NewItem
                key={index}
                item={item}
                index={index}
                lastItem={index === newItems.length - 1}
                handleValueChange={handleValueChange}
                handleRemoveRow={handleRemoveRow}
                handleAddNewRow={handleAddNewRow}
              />
            ))}
          </div>
          <DialogFooter className="flex items-center">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => handleAddNewRow()}
              size={"icon"}
              className="group relative "
            >
              <ChevronDown size={20} />
            </Button>
            <Button type="submit" className="gap-2">
              Upload changes <UploadCloud size={20} />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
