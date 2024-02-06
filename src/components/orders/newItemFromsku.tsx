import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { FolderInput, PackagePlus, UploadCloud, X } from "lucide-react";
import CloseBtn from "../ui/custom/closeBtn";
import { useState } from "react";
import Spinner from "../ui/custom/spinner";

export function NewItemFromSku({ item }: { item: any }) {
  const [newItem, setNewItem] = useState({
    sku: item.sku,
    items: undefined,
    parcels: undefined,
    length: undefined,
    width: undefined,
    height: undefined,
    weight: undefined,
    class: "",
    maxParcels: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleNewItem = (e: any) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitNewItem = async () => {
    try {
      setLoading(true);

      await fetch("http://localhost:8000/api/items/newone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <PackagePlus
            size={20}
            className="text-primary hover:scale-110  ease-in-out duration-75 rounded-full p-[1px]"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl">
        <div className="grid gap-2 ">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium leading-none">New Item</h4>
              <PopoverClose>
                <CloseBtn />
              </PopoverClose>
            </div>
            <p className="text-sm text-muted-foreground">
              Add a new item quickly to database
            </p>
          </div>
          <div className="flex items-start gap-4 mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="sku"
                >
                  Sku
                </Label>
                <Input
                  value={newItem.sku}
                  onChange={(e) => handleNewItem(e)}
                  id="sku"
                  name="sku"
                  readOnly
                  disabled
                  defaultValue={item.sku}
                  className="col-span-3 h-10 "
                />
              </div>

              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="items"
                >
                  Items
                </Label>
                <Input
                  value={newItem.items}
                  onChange={(e) => handleNewItem(e)}
                  id="items"
                  name="items"
                  defaultValue="1"
                  className="col-span-3 h-10 "
                />
              </div>
              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="width"
                >
                  Width
                </Label>
                <Input
                  value={newItem.width}
                  onChange={(e) => handleNewItem(e)}
                  id="width"
                  name="width"
                  className="col-span-3 h-10 "
                />
              </div>
              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="height"
                >
                  Height
                </Label>
                <Input
                  value={newItem.height}
                  onChange={(e) => handleNewItem(e)}
                  id="height"
                  name="height"
                  className="col-span-3 h-10 "
                />
              </div>

              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="length"
                >
                  Length
                </Label>
                <Input
                  value={newItem.length}
                  onChange={(e) => handleNewItem(e)}
                  id="length"
                  name="length"
                  className="col-span-3 h-10 "
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="maxWidth"
                >
                  Weight
                </Label>
                <Input
                  value={newItem.weight}
                  onChange={(e) => handleNewItem(e)}
                  id="weight"
                  name="weight"
                  className="col-span-3 h-10 "
                />
              </div>
              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="maxHeight"
                >
                  Parcels
                </Label>
                <Input
                  value={newItem.parcels}
                  onChange={(e) => handleNewItem(e)}
                  id="parcels"
                  name="parcels"
                  defaultValue="1"
                  className="col-span-3 h-10 "
                />
              </div>

              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="maxParcels"
                >
                  Max parcels
                </Label>
                <Input
                  value={newItem.maxParcels}
                  onChange={(e) => handleNewItem(e)}
                  id="maxParcels"
                  name="maxParcels"
                  className="col-span-3 h-10 "
                />
              </div>
              <div className="grid grid-cols-3 relative items-center gap-2">
                <Label
                  className="absolute -top-2 text-xs font-light bg-background rounded-lg p-[1px]"
                  htmlFor="class"
                >
                  Class
                </Label>
                <Input
                  value={newItem.class}
                  onChange={(e) => handleNewItem(e)}
                  id="class"
                  name="class"
                  className="col-span-3 h-10 "
                />
              </div>
              <Button
                disabled={loading}
                onClick={handleSubmitNewItem}
                className="gap-2 font-bold "
              >
                Upload {loading ? <Spinner /> : <UploadCloud size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
