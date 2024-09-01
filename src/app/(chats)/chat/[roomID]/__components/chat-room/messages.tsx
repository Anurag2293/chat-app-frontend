import { ScrollArea } from "@/components/ui/scroll-area";

import { useSocketStore } from "@/providers/socket-store-provider";

import { SelfChat } from "./self-chat";
import { OtherChat } from "./other-chat";

type MessagesProps = {
	roomID: string
}

export default function Messages(props: MessagesProps) {
	const { socket, messages } = useSocketStore(s => s);

	return (
		<ScrollArea className="flex-1 overflow-auto px-3">
			<div className="grid gap-4">
				<OtherChat />
				<SelfChat />
				<OtherChat />
				<SelfChat />
				<OtherChat />
				<SelfChat />
				<OtherChat />
				<SelfChat />
			</div>
		</ScrollArea>
	)
}