"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignUpButton(props: { content: string }) {
    return (
        <Button
            className="inline-flex h-9 items-center justify-center rounded-md border border-primary-foreground bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => signIn("google", { redirectTo: "/chat" })}
        >
            {props.content}
        </Button>
    )
}