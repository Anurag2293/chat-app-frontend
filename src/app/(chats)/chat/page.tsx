
import { Users } from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

const ChatRoom = () => {
    return (
        <div className="md:col-span-2 hidden md:block border-gray-200 dark:border-gray-800">
            <Card className="h-full shadow-none rounded-none border-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Your Groups</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <Users className="w-16 h-16 mb-4" />
                        <p className="text-lg">Select a group or create a new one to start chatting</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChatRoom