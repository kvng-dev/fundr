import { RevenueBarChart } from "@/components/bar-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="border-b border-muted-foreground/10 w-full p-4 md:mt-8 m-4">
        <div className="px-10 font-semibold underline underline-offset-18 decoration-blue-500 text-sm">
          Online Payments
        </div>
      </div>

      <div className="px-4 md:px-16 my-12 w-full h-full space-y-8">
        <Card className="md:max-w-sm flex flex-col">
          <CardContent className="space-y-2">
            <p className="text-xs text-gray-400">ACCOUNT DETAILS</p>
            <p className="text-[11px] uppercase font-medium">sterling bank</p>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-2xl">80000000000</p>
              <div className="flex gap-2 text-xs items-center capitalize bg-[#9F56D433] text-[#9F56D4] py-1 px-1.5 rounded">
                <Copy className="size-4" /> copy
              </div>
            </div>
            <p className="text-xs md:hidden">OGEDENGBE FRUITS STORE</p>
          </CardContent>
        </Card>

        <div className="w-full">
          <RevenueBarChart />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
