import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Room } from "@prisma/client";

import { getAvatarFallback, shortenRoomDescription } from "@/lib/chat-room";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import PaperclipIcon from "@/components/icons/paper-clip";
import SettingsIcon from "@/components/icons/settings";
import SmileIcon from "@/components/icons/smile";
import SearchIcon from "@/components/icons/search";

import Messages from "./messages";

const chatFormSchema = z.object({
  chatMessage: z.string(),
});

type ChatRoomProps = {
  toggleShowRoomDetails: () => void,
  roomDetails: Room | undefined,
  isLoadingRoomDetails: boolean
}

export default function ChatRoom(props: ChatRoomProps) {
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      chatMessage: "",
    },
  });

  const onSubmit = (values: z.infer<typeof chatFormSchema>) => {
    // TODO: sendMessageToRoom(String(roomID), values.chatMessage);
    form.setValue("chatMessage", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto overflow-hidden">

      <div className="p-3 border-b flex items-center">
        <div className="flex flex-grow items-center gap-2 cursor-pointer" onClick={props.toggleShowRoomDetails}>
          <Avatar className="border w-10 h-10">
            <AvatarImage src={props.roomDetails?.profileImage ?? ""} alt="Profile" />
            <AvatarFallback>{getAvatarFallback(props.roomDetails?.name ?? "")}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <p className="text-sm font-medium leading-none">{props.roomDetails?.name}</p>
            <p className="text-xs text-muted-foreground">{shortenRoomDescription(props.roomDetails?.description ?? "")}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <SearchIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <SettingsIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Messages />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-3 flex items-center gap-3 border-t"
        >
          <FormField
            control={form.control}
            name="chatMessage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl autoFocus>
                  <Input
                    {...field}
                    placeholder="Type your message..."
                    className="flex-1 bg-muted rounded-full pr-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="ghost" size="icon">
            <PaperclipIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <SmileIcon className="w-5 h-5" />
          </Button>
          <Button size="sm">Send</Button>
        </form>
      </Form>
    </div>
  )
}
