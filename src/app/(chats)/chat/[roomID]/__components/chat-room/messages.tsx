import type { Message } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";

import { OtherChat } from "./other-chat";

import { ResultType } from "@/types/api";

export async function getRoomMessages(roomID: string): Promise<ResultType<Message[]>> {
    const response = await fetch(`/api/message?roomID=${roomID}`, {
        method: 'GET'
    });
    const result: ResultType<Message[]> = await response.json();
	if (!result.success || !result.data) {
		throw new Error(result.message);
	}
    return result;
}

type MessagesProps = {
	roomID: string
}

export default function Messages(props: MessagesProps) {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['room-message'],
		queryFn: () => getRoomMessages(props.roomID),
		refetchInterval: 1000
	});

	return (
		<ScrollArea className="flex-1 overflow-auto px-3">
			<div className="grid gap-4">
				{isLoading && 
					<div>Loading messages...</div>
				}
				{!isLoading && isError &&
					<div>Error getting message</div>
				}
				{!isLoading && !isError && data &&
					data.data.map((message) => {
						return <OtherChat key={message.id} content={message.content} />
					})
				}
			</div>
		</ScrollArea>
	)
}