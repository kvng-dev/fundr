"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Transaction } from "@/features/transactionSlice";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()} // optional
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
    cell: ({ row }) => <div>TR_{row.getValue("transaction_id")}</div>,
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transaction_type")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const time = new Date(row.getValue("time"));
      return time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs border flex items-center gap-2 w-fit font-medium ${
            status
              ? "bg-[#5DC090]/10 text-[#144909] border-[#5DC090]"
              : "bg-[#F14156]/10 border-[#F14156] text-[#740613]"
          }`}
        >
          <div
            className={`size-1.5 rounded-full  ${
              status ? "bg-[#92EF80]" : "bg-red-500"
            }`}
          />
          {status ? "Success" : "Failed"}
        </span>
      );
    },
  },
];

interface Props {
  from?: Date;
  to?: Date;
}

export default function TransactionsTable({ from, to }: Props) {
  const { list, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  const filteredData = React.useMemo(() => {
    if (!from && !to) return list;

    return list.filter((tx) => {
      const txDate = new Date(tx.date).getTime();
      const start = from ? new Date(from).getTime() : -Infinity;
      const end = to ? new Date(to).getTime() : Infinity;

      return txDate >= start && txDate <= end;
    });
  }, [from, to, list]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading)
    return (
      <div className="animate-pulse space-y-4 p-4 max-w-sm w-full mx-auto">
        {/* Skeleton block for title */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        {/* Skeleton block for subtitle */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        {/* Skeleton block for list items */}
        <div className="space-y-2 mt-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-4 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full px-8 hidden md:block mt-12">
      <div className="overflow-hidden text-gray-500">
        <Table>
          <TableHeader className="text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="uppercase text-xs ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-sm" key={header.id}>
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
          <TableBody className="bg-white rounded-2xl">
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        {/* Row selection info */}
        <div className="text-muted-foreground flex-1 text-sm">
          Showing {table.getRowModel().rows.length} of {list.length} results
        </div>

        {/* Pagination */}
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          {/* Dynamic Page Numbers with Ellipsis */}
          {(() => {
            const totalPages = table.getPageCount();
            const currentPage = table.getState().pagination.pageIndex;
            const pages: (number | string)[] = [];

            for (let i = 0; i < totalPages; i++) {
              if (
                i === 0 || // first page
                i === totalPages - 1 || // last page
                (i >= currentPage - 1 && i <= currentPage + 1) // nearby pages
              ) {
                pages.push(i);
              } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
              }
            }

            return pages.map((p, idx) =>
              p === "..." ? (
                <span key={idx} className="px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={idx}
                  variant={p === currentPage ? "ghost" : "link"}
                  size="sm"
                  className={` border${
                    p === currentPage
                      ? "border-blue-800 border bg-transparent cursor-pointer"
                      : ""
                  } : `}
                  onClick={() => table.setPageIndex(p as number)}
                >
                  {(p as number) + 1}
                </Button>
              )
            );
          })()}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
