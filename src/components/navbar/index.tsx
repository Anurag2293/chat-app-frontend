'use client'

import Link from "next/link";
import { useTheme } from "next-themes";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
	LogOut,
	SunMoon,
	Sun,
	Moon,
	MonitorCog,
	User
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import MessageCircleIcon from "@/components/icons/message-circle";
import { SignInButton } from "@/components/navbar/signin-button";
import { SignUpButton } from "@/components/navbar/signup-button";

type NavbarProps = {
	session: Session | null
}

export default function Navbar(props: NavbarProps) {
	const { setTheme, theme } = useTheme();

	return (
		<header className="py-6 px-4 md:px-6">
			<div className="container flex items-center justify-between px-0">
				<Link href="/" className="flex items-center gap-2" prefetch={false}>
					<MessageCircleIcon className="h-8 w-8" />
					<span className="text-3xl font-bold">Chatter</span>
				</Link>
				<div className="flex items-center gap-4">
					{(!props.session || !props.session.user) && <SignInButton content="Sign In" />}
					{(!props.session || !props.session.user) && <SignUpButton content="Sign Up" />}
					{(props.session && props.session.user) &&
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full">
									<Avatar className="h-12 w-12">
										<AvatarImage src={props.session.user.image || ""} />
										<AvatarFallback>{props.session.user.name?.split(" ").map(word => word.substring(0, 1).toUpperCase()).join("").substring(0, 2)}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>{props.session.user.name}</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>{props.session.user.email}</DropdownMenuItem>
								<DropdownMenuSeparator />

								<DropdownMenuGroup>
									<DropdownMenuItem>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</DropdownMenuItem>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<SunMoon className="mr-2 h-4 w-4" />
											<span>Theme</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem className={theme === "light" ? "bg-muted" : ''} onClick={() => setTheme("light")}>
													<Sun className="mr-2 h-4 w-4" />
													<span>Light</span>
												</DropdownMenuItem>
												<DropdownMenuItem className={theme === "dark" ? "bg-muted" : ''} onClick={() => setTheme("dark")}>
													<Moon className="mr-2 h-4 w-4" />
													<span>Dark</span>
												</DropdownMenuItem>
												<DropdownMenuItem className={theme === "system" ? "bg-muted" : ''} onClick={() => setTheme("system")}>
													<MonitorCog className="mr-2 h-4 w-4" />
													<span>System</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
								</DropdownMenuGroup>

								<DropdownMenuSeparator />

								<DropdownMenuItem onClick={() => signOut()}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					}
				</div>
			</div>
		</header>
	)
}