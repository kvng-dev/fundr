"use client";
import {
  Globe,
  LayoutDashboard,
  Send,
  ListOrdered,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const navItems = [
  {
    label: "Get Started",
    icon: Globe,
    path: "/get-started",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Accounts",
    icon: Wallet,
    path: "/accounts",
  },
  {
    label: "Transfer",
    icon: Send,
    path: "/transfer",
  },
  {
    label: "Transactions",
    icon: ListOrdered,
    path: "/transactions",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-64 h-full md:flex flex-col pt-8 hidden">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={`${item.path}`}
          className={`flex items-center gap-3 my-1 hover:bg-blue-500 text-[#04004D] px-6  py-3 text-xs font-medium ${
            pathname === item.path && "bg-blue-500 text-white"
          }`}
        >
          <item.icon className="size-5" />
          <>{item.label}</>
        </Link>
      ))}
    </div>
  );
};
export default Sidebar;
