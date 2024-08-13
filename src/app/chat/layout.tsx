import type { Metadata } from "next";

import ChatContactLayout from "@/components/layout/chat-layout";

export const metadata: Metadata = {
	title: "Chat App - Room",
	description: "Chat with your friends!",
};

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
    return <main>
        <ChatContactLayout>
            {children}
        </ChatContactLayout>
    </main>
}