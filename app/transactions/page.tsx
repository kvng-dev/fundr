"use client";
import { ArrowLeft, ChevronDown, UploadCloud } from "lucide-react";
import TransactionsTable from "./_components/transaction-table";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/date-range-picker";
import TransactionCard from "@/app/transactions/_components/transaction-card";
import { useState } from "react";
import { differenceInDays, startOfMonth } from "date-fns";
import { toast } from "sonner";

const MAX_DATE_RANGE_DAYS = 1000;
const TransactionsPage = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <div className="">
      <div className="px-4 py-4  border-b md:px-16  mb-4">
        <div className="flex md:hidden items-center gap-4">
          <ArrowLeft />
          Transactions
        </div>

        <div className="lg:flex justify-between items-center hidden">
          <div className="text-sm flex gap-2 items-center">
            All Accounts
            <ChevronDown className="size-4" />
          </div>
          <div className="flex items-center gap-8 text-sm">
            <div className="flex gap-4 items-center">
              Select Date Range:
              <DateRangePicker
                initialDateFrom={dateRange.from}
                initialDateTo={dateRange.to}
                showCompare={false}
                onUpdate={(values) => {
                  const { from, to } = values.range;

                  if (!from || !to) return;
                  if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                    toast.error(
                      `The selected date range is too big. Max number of allowed range is ${MAX_DATE_RANGE_DAYS} days`
                    );
                    return;
                  }
                  setDateRange({ from, to });
                }}
              />
            </div>

            <Button variant={"secondary"}>
              <UploadCloud />
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="px-4 space-y-2 md:hidden">
        <div className="flex items-center justify-between">
          <div className="text-sm flex gap-2 items-center">
            All Accounts
            <ChevronDown className="size-4" />
          </div>
          <Button variant={"secondary"}>
            <UploadCloud />
            Export
          </Button>
        </div>
        <div className="flex gap-4 items-center text-sm justify-between">
          Select Date Range:
          <DateRangePicker />
        </div>
      </div>
      <TransactionsTable from={dateRange.from} to={dateRange.to} />
      <div className="md:hidden space-y-2 my-8 px-4">
        <h2 className="font-semibold text-lg">Transactions</h2>
        <TransactionCard />
      </div>
    </div>
  );
};
export default TransactionsPage;
