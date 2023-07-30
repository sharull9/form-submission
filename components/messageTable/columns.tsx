"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function deleteMessage(id: string) {
  const res = await fetch(
    `https://form-submission-klqpnkquq-sharull9.vercel.app/message/?id=${id}`,
    {
      method: "DELETE",
    }
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MessageList = {
  id: string;
  name: string;
  email: string;
  message: string;
};

export const columns: ColumnDef<MessageList>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const message = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-50 hover:text-red-400 cursor-pointer"
              onClick={() => deleteMessage(message.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
