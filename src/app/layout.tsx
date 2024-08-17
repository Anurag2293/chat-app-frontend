import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { SocketStoreProvider } from "@/providers/socket-store-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chat App",
	description: "Chat with your friends!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SocketStoreProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<ReactQueryProvider>
							{children}
						</ReactQueryProvider>
					</ThemeProvider>
					<Toaster />
				</SocketStoreProvider>
			</body>
		</html>
	);
}
