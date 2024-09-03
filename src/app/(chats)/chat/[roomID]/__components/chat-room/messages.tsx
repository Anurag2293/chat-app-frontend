import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { getRoomMessages } from "@/api/message";
import { ScrollArea } from "@/components/ui/scroll-area";

import { OtherChat } from "./other-chat";
import { SelfChat } from "./self-chat";

type MessagesProps = {
	roomID: string
}

export default function Messages(props: MessagesProps) {
	const session = useSession();
	const { data, isError, isLoading } = useQuery({
		queryKey: ['room-message'],
		queryFn: () => getRoomMessages(props.roomID),
		refetchInterval: 10000
	});

	const messages = data?.data;

	return (
		<ScrollArea className="flex-1 overflow-auto px-6">
			{isLoading &&
				<div>Loading messages...</div>
			}
			{!isLoading && isError &&
				<div>Error getting message</div>
			}
			{!isLoading && !isError && data && messages &&
				messages.map((message, index) => {
					if (message.user.email === session.data?.user?.email) {
						const isFirstInGroup = (index === 0) || (messages[index - 1].userID !== message.userID);

						return <SelfChat key={message.id} data={message} isFirstInGroup={isFirstInGroup} />
					}
					return <OtherChat key={message.id} data={message} />
				})
			}
		</ScrollArea>
	)
}