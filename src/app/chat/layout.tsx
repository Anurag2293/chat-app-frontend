import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlusIcon from "@/components/icons/plus";

import UserContacts from "./components/user-contacts";

export const metadata: Metadata = {
  title: "Chat App - Room",
  description: "Chat with your friends!",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="grid grid-cols-3 md:grid-cols-4 w-full overflow-hidden">
        <div className="bg-muted/20 p-3 border-r hidden md:block">
          <div className="flex items-center justify-between space-x-4">
            <Link href="/">
              <div className="font-medium text-sm">Chats</div>
            </Link>
            <Link href="/create-group">
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">New chat</span>
              </Button>
            </Link>
          </div>
          <div className="py-4">
            <form>
              <Input placeholder="Search" className="h-8" />
            </form>
          </div>
          <div className="grid gap-2">
            <UserContacts />
          </div>
        </div>
        <div className="min-h-screen col-span-3 flex flex-col justify-between">
          {children}
        </div>
      </div>
    </main>
  );
}