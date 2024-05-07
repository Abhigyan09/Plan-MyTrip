"use client";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

const navLinks = [
  {
    key: "plan",
    lable: "Plan",
  },
  {
    key: "expense-tracker",
    lable: "Expense Tracker",
  },
  {
    key: "settings",
    lable: "Settings",
  },
];

const TopMenuBar = () => {
  const pathname = usePathname();

  const currentPathArray = pathname.split("/")[3];
  return (
    <div className="h-10 border-b-2 w-full bg-white">
      <ul className="flex gap-3 h-full justify-start items-center lg:px-20 px-5">
        {navLinks.map((link) => (
          <li
            key={link.key}
            className={cn(
              "h-full cursor-pointer hover:text-blue-800 flex justify-center items-center",
              {
                "border-b-4 border-b-blue-500": link.key
                  .toLowerCase()
                  .includes(currentPathArray.toLocaleLowerCase()),
              }
            )}
          >
            <Link href={`${link.key}`}>{link.lable}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMenuBar;
