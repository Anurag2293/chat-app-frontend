import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat App - Room",
  description: "Chat with your friends!",
};

export default function NewChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full overflow-hidden">
        <div className="col-span-1 p-3 border-r bg-muted/20">
          {children}
        </div>
        <div className="min-h-screen flex flex-col justify-between">
        </div>
      </div>
    </main>
  );
}