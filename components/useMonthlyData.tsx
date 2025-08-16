import { useSelector } from "react-redux";
import { Transaction } from "@/features/transactionSlice";
import { RootState } from "@/store/store";

type MonthlyRevenue = {
  month: string;
  revenue: number;
};

const useMonthlyRevenue = () => {
  const { list } = useSelector((state: RootState) => state.transactions);

  // Months mapping
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize months with 0 revenue
  const monthlyData: MonthlyRevenue[] = months.map((m) => ({
    month: m,
    revenue: 0,
  }));

  list.forEach((tx: Transaction) => {
    if (tx.date) {
      const date = new Date(tx.date);
      const year = date.getFullYear();

      // Only include 2024 & 2025
      if (year === 2024 || year === 2025) {
        const monthIndex = date.getMonth(); // 0-11
        monthlyData[monthIndex].revenue += parseFloat(tx.amount) || 0;
      }
    }
  });

  return monthlyData;
};

export default useMonthlyRevenue;
