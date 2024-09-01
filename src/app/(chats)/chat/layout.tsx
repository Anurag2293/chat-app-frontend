import type { Metadata } from "next";

import UserContacts from "./__components/user-contacts";
import React from "react";

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
      <div className="grid grid-cols-1 md:grid-cols-3 w-full max-h-screen overflow-hidden">
        <UserContacts />
        {children}
      </div>
    </main>
  );
}