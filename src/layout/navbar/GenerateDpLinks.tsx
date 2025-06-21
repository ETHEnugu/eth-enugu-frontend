import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface GenerateDpLinksProps {
  pathname?: string;
  onClick?: (setIsOpen: boolean) => void;
}

export default function GenerateDpLinks({
  pathname,
  onClick,
}: GenerateDpLinksProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`w-full md:w-fit py-4 flex items-start  text-lg font-medium md:text-base cursor-pointer border-b border-black/40 outline-0 md:border-0 transition-colors duration-200 hover:text-green-550 ${
            pathname === "generate_dp"
              ? "text-green-550 font-semibold"
              : "text-gray-700"
          }`}
        >
          Generate DP <ChevronDown size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white px-3 z-50 border-[1px] rounded-sm mt-[-10px] md:mt-2 ">
          <Link onClick={() => onClick?.(false)} href={"/generate-dp"}>
            {" "}
            <DropdownMenuItem className="border-0 outline-0 cursor-pointer transition-colors duration-200 hover:text-green-550 my-0.5 py-3 border-b border-gray-400">
              Builder Resisdency DP
            </DropdownMenuItem>
          </Link>
          <Link
            onClick={() => onClick?.(false)}
            href={"/generate-dp?from=conference"}
          >
            {" "}
            <DropdownMenuItem className=" border-0 outline-0 cursor-pointer transition-colors duration-200 hover:text-green-550 my-0.5 py-3">
              Conference /Summit DP
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
