
import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import MessageCircleIcon from "@/components/icons/message-circle";
import { SignInButton } from "@/app/components/signin-button";
import { SignOutButton } from "@/app/components/signout-button";
import { SignUpButton } from "@/app/components/signup-button";

export default async function Navbar() {
    const session = await auth();

    return (
        <header className="bg-primary text-primary-foreground dark:bg-black dark:text-white py-6 px-4 md:px-6">
            <div className="container flex items-center justify-between px-0">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <MessageCircleIcon className="h-6 w-6" />
                    <span className="text-xl font-bold">Chatter</span>
                </Link>
                <div className="flex items-center gap-4">
                    {(!session || !session.user) && <SignInButton content="Sign In" />}
                    {(!session || !session.user) && <SignUpButton content="Sign Up" />}
                    {(session && session.user) &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session.user.image || ""} />
                                        <AvatarFallback>{session.user.name?.split(" ").map(word => word.substring(0, 1).toUpperCase()).join("").substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                        <div className="h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                        <div className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <SignOutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </div>
        </header>
    )
}