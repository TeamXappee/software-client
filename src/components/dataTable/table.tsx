"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateColumnDefs } from "./columns";
import useDocumentState from "@/hooks/useTableState";

export function DataTableDemo({
  data,
  totalCount,
  PAGE_SIZE,
  pageIndex,
  handleFetchMore,
  handlePageIndex,
}: {
  data: any;
  totalCount: number;
  PAGE_SIZE: number;
  pageIndex: number;
  handleFetchMore: () => void;
  handlePageIndex: (newIdx: number) => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnsSelectOpen, setColumnsSelectOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const handleSetUpdatedDocuments = (id: string, newData: any) => {
    const oldHistoryRaw = localStorage.getItem("updateHistory");
    const oldHistory = oldHistoryRaw ? JSON.parse(oldHistoryRaw) : {};

    const updatedDataForId = { ...oldHistory[id], ...newData };

    const newHistory = { ...oldHistory, [id]: updatedDataForId };

    localStorage.setItem("updateHistory", JSON.stringify(newHistory));
  };

  const table = useReactTable({
    data: data,
    columns: generateColumnDefs(data, handleSetUpdatedDocuments),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pageIndex,
        pageSize: PAGE_SIZE,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 absolute top-[0.670rem] left-[82.5%]">
        <DropdownMenu open={columnsSelectOpen}>
          <DropdownMenuTrigger
            onClick={() => setColumnsSelectOpen(!columnsSelectOpen)}
            asChild
          >
            <Button variant="outline" className="ml-auto h-8 rounded-xl">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onInteractOutside={() => setColumnsSelectOpen(!columnsSelectOpen)}
            align="end"
            className="max-h-[75vh] overflow-y-auto rounded-md"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  // colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {pageIndex + 1} from {Math.ceil(totalCount / PAGE_SIZE)} page(s).
        </div>
        <div className="space-x-2  relative right-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFetchMore();
            }}
            disabled={
              !table.getCanNextPage() &&
              pageIndex + 1 >= Math.ceil(totalCount / PAGE_SIZE)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
