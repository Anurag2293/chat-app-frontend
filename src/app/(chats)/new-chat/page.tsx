import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlusIcon from "@/components/icons/plus";

const NewChatRoom = () => {
    return <div className="w-full">
        <div className="flex items-center justify-between space-x-4">
            <Link href="/">
                <div className="font-medium text-sm">New Chats</div>
            </Link>
            <Link href="/new-chat/create-group">
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">New chat</span>
                </Button>
            </Link>
        </div>
    </div>
}

export default NewChatRoom;