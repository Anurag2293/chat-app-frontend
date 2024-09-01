import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type OtherChatProps = {
	content: string
}

export const OtherChat = (props: OtherChatProps) => {
	return (
		<div className="flex items-start gap-4">
			<Avatar className="w-10 h-10">
				<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<div className="grid gap-1">
				<div className="flex items-center gap-2">
					<div className="font-medium">John Doe</div>
					<div className="text-xs text-muted-foreground">2:39 PM</div>
				</div>
				<div className="bg-card rounded-lg p-3 max-w-[80%]">
					<p>{props.content}</p>
				</div>
			</div>
		</div>
	)
}