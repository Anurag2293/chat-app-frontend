"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButton(props: { content: string }) {
    return (
        <Button
            variant="outline"
            size="lg"
            className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-sm font-medium text-primary border shadow transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => signIn("google", { redirectTo: "/chat" })}
        >
            {props.content}
        </Button>
    )
}