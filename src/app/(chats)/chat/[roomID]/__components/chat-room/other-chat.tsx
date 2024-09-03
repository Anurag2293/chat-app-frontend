import { UserIncludedMessage } from "@/types/api";
import { getAvatarFallback, getTimeFromDateTime } from "@/lib/chat-room";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type OtherChatProps = {
	data: UserIncludedMessage
}

export const OtherChat = (props: OtherChatProps) => {
	return (
		<div className="flex items-start gap-4">
			<Avatar className="w-10 h-10">
				<AvatarImage src={props.data.user.profileImage ?? ""} alt={props.data.user.name} />
				<AvatarFallback>{getAvatarFallback(props.data.user.name)}</AvatarFallback>
			</Avatar>
			<div className="grid gap-1">
				<div className="flex items-center gap-2">
					<div className="font-medium">{props.data.user.name}</div>
					<div className="text-xs text-muted-foreground">{getTimeFromDateTime(props.data.sentAt)}</div>
				</div>
				<div className="bg-gray-600 rounded-lg p-3 max-w-[80%]">
					<p>{props.data.content}</p>
				</div>
			</div>
		</div>
	)
}