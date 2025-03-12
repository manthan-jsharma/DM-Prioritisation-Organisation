"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Inbox,
  Star,
  Clock,
  Send,
  Trash,
  Archive,
  Tag,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Inbox, label: "Priority Inbox", href: "/dashboard" },
  { icon: Star, label: "Important", href: "/dashboard/important" },
  { icon: Clock, label: "Snoozed", href: "/dashboard/snoozed" },
  { icon: Send, label: "Sent", href: "/dashboard/sent" },
  { icon: Trash, label: "Trash", href: "/dashboard/trash" },
  { icon: Archive, label: "Archive", href: "/dashboard/archive" },
  { icon: Tag, label: "Labels", href: "/dashboard/labels" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-white h-full flex flex-col">
      <div className="p-4">
        <Button className="w-full justify-start">
          <span>Compose</span>
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "font-medium"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
