
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";

import { ReactQueryProvider } from "./react-query-provider"
import { ThemeProvider } from "./theme-provider";
import { SocketStoreProvider } from "./socket-store-provider";
import { SocketAuth } from "@/components/socket-auth";
import { SessionProvider } from "next-auth/react";

export default async function Providers({ children }: { children: React.ReactNode }) {
	const session = await auth();

	if (!session) {
		return <>
			<SessionProvider>
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
			</SessionProvider>
		</>
	}

	return (
		<>
			<SessionProvider>
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
					<SocketAuth session={session} />
				</SocketStoreProvider>
			</SessionProvider>
		</>
	);
}