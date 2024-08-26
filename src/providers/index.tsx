
import { ReactQueryProvider } from "./react-query-provider"
import SessionProvider from './session-provider';
import { ThemeProvider } from "./theme-provider";

import { SocketStoreProvider } from "./socket-store-provider";

import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import type { Session } from "next-auth";

export default async function Providers({ children }: { children: React.ReactNode }) {
	const session = await auth();

	console.log({ session });

	const DefaultSession: Session = {
		expires: ""
	}

	if (!session) {
		return <>
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
		</>
	}

	return (
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
	);
}