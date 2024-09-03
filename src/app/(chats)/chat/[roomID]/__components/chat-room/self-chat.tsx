import { UserIncludedMessage } from "@/types/api";
import { getAvatarFallback, getTimeFromDateTime } from "@/lib/chat-room";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type SelfChatProps = {
	data: UserIncludedMessage,
	isFirstInGroup: boolean
}

export const SelfChat = (props: SelfChatProps) => {
	return (
		<div className="flex justify-end mb-1">
			<div className={`bg-primary px-3 py-1 rounded-lg ${props.isFirstInGroup ? 'rounded-se-none' : ''}`}>
				<p className="text-secondary">{props.data.content}</p>
			</div>
		</div>
	)
}