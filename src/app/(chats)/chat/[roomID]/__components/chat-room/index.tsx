import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Room } from "@prisma/client";

import { getAvatarFallback, shortenRoomDescription } from "@/lib/chat-room";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";

import PhoneIcon from "@/components/icons/phone";
import SendIcon from "@/components/icons/send";
import VideoIcon from "@/components/icons/video";

const SelfChat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
      {children}
    </div>
  );
};

const OtherChat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
      {children}
    </div>
  );
};

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
    <div className="relative h-full">
      <div className="p-3 flex border-b items-center">
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
            <span className="sr-only">Call</span>
            <PhoneIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Video call</span>
            <VideoIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-4 p-3">
        {/* {messages.map((chat, index) => {
          if (chat.senderID === socket?.id) {
            return (
              <SelfChat key={index}>
                {chat.senderID}: {chat.text}
              </SelfChat>
            );
          }
          return (
            <OtherChat key={index}>
              {chat.senderID}: {chat.text}
            </OtherChat>
          );
        })} */}
      </div>
      <div className="border-t absolute bottom-0 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center space-x-2 p-3"
          >
            <FormField
              control={form.control}
              name="chatMessage"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl autoFocus>
                    <Input placeholder="Type your message..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <span className="sr-only">Send</span>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
