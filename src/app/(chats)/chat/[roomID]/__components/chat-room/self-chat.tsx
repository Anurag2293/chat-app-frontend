import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const SelfChat = () => {
	return (
		<div className="flex items-start gap-4 justify-end">
			<div className="grid gap-1">
				<div className="flex items-center gap-2 justify-end">
					<div className="font-medium">Jane Smith</div>
					<div className="text-xs text-muted-foreground">2:41 PM</div>
				</div>
				<div className="bg-primary rounded-lg p-3 max-w-[80%] text-primary-foreground">
					<p>{`Sounds great, I'm excited to see the progress!`}</p>
				</div>
			</div>
			<Avatar className="w-10 h-10">
				<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
				<AvatarFallback>JS</AvatarFallback>
			</Avatar>
		</div>
	)
}