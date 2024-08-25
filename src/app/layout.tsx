import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import "@/styles/globals.css";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import Providers from "@/providers";

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
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<Providers>
					{children}
				</Providers>
			</body>
		</html >
	);
}
