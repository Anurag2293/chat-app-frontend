"use client"

import { signOut } from "next-auth/react";
export function SignOutButton() {
    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => signOut()}>
            <div className="h-4 w-4" />
            <span>Logout</span>
        </div>
    );
}