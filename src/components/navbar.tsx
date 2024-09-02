'use client'

import Link from "next/link";
import { type Session } from "next-auth";

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
import { SignInButton } from "@/app/__components/signin-button";
import { SignOutButton } from "@/app/__components/signout-button";
import { SignUpButton } from "@/app/__components/signup-button";

type NavbarProps = {
    session: Session | null
}

export default function Navbar(props: NavbarProps) {
    return (
        <header className="py-6 px-4 md:px-6">
            <div className="container flex items-center justify-between px-0">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <MessageCircleIcon className="h-6 w-6" />
                    <span className="text-xl font-bold">Chatter</span>
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