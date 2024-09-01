import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Messages() {
	return (
		<ScrollArea className="flex-1 overflow-auto p-3">
			<div className="grid gap-4">
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
							<p>Hey everyone, just wanted to share some updates on the new design system we're working on.</p>
						</div>
					</div>
				</div>
				<div className="flex items-start gap-4 justify-end">
					<div className="grid gap-1">
						<div className="flex items-center gap-2 justify-end">
							<div className="font-medium">Jane Smith</div>
							<div className="text-xs text-muted-foreground">2:41 PM</div>
						</div>
						<div className="bg-primary rounded-lg p-3 max-w-[80%] text-primary-foreground">
							<p>Sounds great, I'm excited to see the progress!</p>
						</div>
					</div>
					<Avatar className="w-10 h-10">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>JS</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex items-start gap-4">
					<Avatar className="w-10 h-10">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>AL</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<div className="font-medium">Alex Lee</div>
							<div className="text-xs text-muted-foreground">2:43 PM</div>
						</div>
						<div className="bg-card rounded-lg p-3 max-w-[80%]">
							<p>Awesome, can't wait to see the new designs. Let me know if you need any feedback!</p>
						</div>
					</div>
				</div>

				<div className="flex items-start gap-4">
					<Avatar className="w-10 h-10">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>AL</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<div className="font-medium">Alex Lee</div>
							<div className="text-xs text-muted-foreground">2:43 PM</div>
						</div>
						<div className="bg-card rounded-lg p-3 max-w-[80%]">
							<p>Awesome, can't wait to see the new designs. Let me know if you need any feedback!</p>
						</div>
					</div>
				</div><div className="flex items-start gap-4">
					<Avatar className="w-10 h-10">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>AL</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<div className="font-medium">Alex Lee</div>
							<div className="text-xs text-muted-foreground">2:43 PM</div>
						</div>
						<div className="bg-card rounded-lg p-3 max-w-[80%]">
							<p>Awesome, can't wait to see the new designs. Let me know if you need any feedback!</p>
						</div>
					</div>
				</div><div className="flex items-start gap-4">
					<Avatar className="w-10 h-10">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>AL</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<div className="font-medium">Alex Lee</div>
							<div className="text-xs text-muted-foreground">2:43 PM</div>
						</div>
						<div className="bg-card rounded-lg p-3 max-w-[80%]">
							<p>Awesome, can't wait to see the new designs. Let me know if you need any feedback!</p>
						</div>
					</div>
				</div><div className="flex items-start gap-4">
					<Avatar className="w-10 h-10">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>AL</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<div className="font-medium">Alex Lee</div>
							<div className="text-xs text-muted-foreground">2:43 PM</div>
						</div>
						<div className="bg-card rounded-lg p-3 max-w-[80%]">
							<p>Awesome, can't wait to see the new designs. Let me know if you need any feedback!</p>
						</div>
					</div>
				</div>
			</div>
		</ScrollArea>
	)
}