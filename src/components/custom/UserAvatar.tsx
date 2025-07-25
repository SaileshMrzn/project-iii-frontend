"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/actions/auth";
import { Session } from "next-auth";

export const UserAvatar = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-4 text-sm">
          <p>{session?.user?.email}</p>
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} alt="User" />
            <AvatarFallback>
              {session?.user?.name?.split(" ")[0].charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const UserAvatarMobile = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-3 text-sm">
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} alt="User" />
            <AvatarFallback>
              {session?.user?.name?.split(" ")[0].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p>{session?.user?.email}</p>
        </div>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
};
