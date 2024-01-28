import { TOrderDetails } from "@/types/order";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { parseDate } from "@/lib/utils";

export function generateColumnDefs(
  data: any[],
  handleSetUpdatedDocuments: (id: string, newData: any) => void
): ColumnDef<TOrderDetails>[] {
  if (!data || !data.length) {
    return [];
  }

  const firstItem = data[0];
  const keys = Object.keys(firstItem);

  const columns = keys.map((key) => ({
    accessorKey: key,
    header: key.toLowerCase(),
    cell: ({ row }: { row: any }) => {
      const value = row.getValue(key);

      return (
        <div
          className={`group text-xs h-min w-full whitespace-nowrap relative`}
        >
          <div className="absolute -top-10 right-0 p-2 hidden group-hover:inline-flex bg-input rounded-lg ease-in-out duration-75">
            ID: {row.getValue("ORDER_ID")} | {row.getValue("CHANNEL_NAME")}
          </div>
          <div
            suppressContentEditableWarning
            contentEditable
            onInput={(e) => handleSetUpdatedDocuments(row.getValue("ORDER_ID"), {[key]:e.currentTarget.textContent})}
            className="focus:outline-none focus:border-b border-foreground/50 bg-transparent h-4"
          >
            {key === "ORDER_DATE" || key === "SHIPPED_DATE"
              ? value && parseDate(value)
              : value}
          </div>
        </div>
      );
    },
  }));

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
  ];
}
