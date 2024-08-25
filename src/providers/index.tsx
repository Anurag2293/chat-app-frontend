
import { ReactQueryProvider } from "./react-query-provider"
import SessionProvider from './session-provider';
import { SocketStoreProvider } from "./socket-store-provider";
import { ThemeProvider } from "./theme-provider";

import { Toaster } from "@/components/ui/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
	return <SessionProvider>
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
	</SessionProvider>
}