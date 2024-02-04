import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function NewItem({
  item,
  handleValueChange,
  index,
  handleAddNewRow,
  handleRemoveRow,
  lastItem,
}: {
  item: any;
  handleValueChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  handleAddNewRow: () => void;
  handleRemoveRow: (index: number) => void;
  index: number;
  lastItem: boolean;
}) {
  return (
    <div className="flex group items-center relative px-5">
      <Button
        type="button"
        className="hidden group-hover:inline-flex rounded-full hover:bg-red-500 absolute w-4 h-4 hover:text-white -left-1"
        variant={"secondary"}
        disabled={index === 0 && lastItem}
        size={"icon"}
        onClick={() => handleRemoveRow(index)}
      >
        <X size={13} />
      </Button>
      <Input
        id={`sku-${index}`}
        className="focus:z-10 w-[120px]"
        placeholder="SKU*"
        name="sku"
        value={item.sku}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Items*"
        name="items"
        value={item.items}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Parcels*"
        name="parcels"
        value={item.parcels}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Length*"
        name="length"
        value={item.length}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Width*"
        name="width"
        value={item.width}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Height*"
        name="height"
        value={item.height}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Weight*"
        name="weight"
        value={item.weight}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Class*"
        name="class"
        value={item.class}
        onChange={(e) => handleValueChange(index, e)}
      />
      <Input
        className="focus:z-10"
        placeholder="Max Parcels*"
        name="maxParcels"
        value={item.maxParcels}
        onChange={(e) => {
          handleValueChange(index, e);
          lastItem && handleAddNewRow();
        }}
      />
    </div>
  );
}
