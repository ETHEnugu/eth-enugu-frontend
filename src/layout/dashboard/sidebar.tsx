import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarData } from "./_data";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Image
          src="/logo.svg"
          alt="ETHEnugu Logo"
          width={150}
          height={150}
          title="EthEnugu"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData?.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.link}
                    className={
                      pathname === item?.link
                        ? "bg-green-550/10 text-green-350"
                        : ""
                    }
                  >
                    <Link
                      href={item.link}
                      className="flex items-center gap-2 w-full"
                    >
                      <Icon icon={item.icon} width={24} height={24} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
