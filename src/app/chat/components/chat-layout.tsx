import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import PlusIcon from "@/components/icons/plus";

const chatContacts = [
  {
    avatarFallback: "OM",
    name: "Sofia Davis",
    lastMessage: "hey what's going on?",
    lastMessageDuration: "2h",
    active: true,
  },
  {
    avatarFallback: "AJ",
    name: "Alex Johnson",
    lastMessage: "Just finished a great book! 📚",
    lastMessageDuration: "45m",
    active: false,
  },
  {
    avatarFallback: "MG",
    name: "Maria Gonzalez",
    lastMessage: "Excited for the weekend!",
    lastMessageDuration: "1h",
    active: false,
  },
  {
    avatarFallback: "KB",
    name: "Kevin Brown",
    lastMessage: "Who's up for a movie night?",
    lastMessageDuration: "3h",
    active: false,
  },
  {
    avatarFallback: "LW",
    name: "Lily White",
    lastMessage: "Morning coffee is the best! ☕",
    lastMessageDuration: "30m",
    active: false,
  },
];

export default function ChatContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 w-full overflow-hidden">
      <div className="bg-muted/20 p-3 border-r hidden md:block">
        <div className="flex items-center justify-between space-x-4">
          <div className="font-medium text-sm">Chats</div>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">New chat</span>
          </Button>
        </div>
        <div className="py-4">
          <form>
            <Input placeholder="Search" className="h-8" />
          </form>
        </div>
        <div className="grid gap-2">
          {chatContacts.map((contact, index) => (
            <Link
              href="#"
              className={`flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 ${contact.active && "bg-muted"}`}
              prefetch={false}
              key={index}
            >
              <Avatar className="border w-10 h-10">
                <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                <AvatarFallback>{contact.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">
                  {contact.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {contact.lastMessage} &middot; {contact.lastMessageDuration}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="min-h-screen col-span-3 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
