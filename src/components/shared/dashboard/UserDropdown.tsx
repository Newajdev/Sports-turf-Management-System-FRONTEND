"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth.services";
import { Key, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserDropdownProps {
  userInfo: {
    name: string;
    email: string;
    role: string;
  };
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const initials = userInfo.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={"outline"} size={"icon"} className="rounded-full hover:bg-muted transition-colors">
            <span className="text-sm font-semibold text-primary">
              {initials || "U"}
            </span>
          </Button>
        }
      />

      <DropdownMenuContent align={"end"} className="w-60 p-2 shadow-premium-hover border-none">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1 p-1">
              <p className="text-sm font-bold text-foreground truncate">
                {userInfo.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userInfo.email}
              </p>
              <p className="text-[10px] w-fit font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider mt-1">
                {userInfo.role.replace("_", " ")}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-muted/50" />

        <DropdownMenuItem asChild>
          <Link href={"/profile"} className="cursor-pointer flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">My Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={"/change-password"} className="cursor-pointer flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors">
            <Key className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Change Password</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-muted/50" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer flex items-center py-2 px-3 rounded-md text-destructive focus:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="text-sm font-semibold">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
