"use client";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import UserDropdown from "./user-dropdown";
import { useState } from "react";
import { navItems } from "./sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [toggleNav, setToggleNav] = useState(false);
  return (
    <div className="py-4 px-6  flex justify-between bg-muted-foreground/10 h-20 border-b border items-center">
      <Menu className="md:hidden" onClick={() => setToggleNav(!toggleNav)} />
      <div className="">
        <Image src={"/logo.png"} height={10} width={100} alt="logo" />
      </div>

      <div className="flex gap-2 items-center">
        <Bell className="text-muted-foreground size-5" />
        <UserDropdown />
      </div>
      <div
        className={`bg-white w-2/3 h-full absolute z-50 top-20 flex  flex-col left-0 transition-transform ${
          toggleNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-16">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={`${item.path}`}
              onClick={() => setToggleNav(false)}
              className={`flex items-center gap-3 my-1 hover:bg-blue-500 text-[#04004D] px-6  py-3 text-xs font-medium ${
                pathname === item.path && "bg-blue-500 text-white"
              }`}
            >
              <item.icon className="size-5" />
              <>{item.label}</>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
