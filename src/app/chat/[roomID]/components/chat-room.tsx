"use client";

import { useParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import PhoneIcon from "@/components/icons/phone";
import SendIcon from "@/components/icons/send";
import VideoIcon from "@/components/icons/video";

import { useSocketStore } from "@/providers/socket-store-provider";

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

export default function ChatRoom() {
  const { roomID } = useParams();

  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      chatMessage: "",
    },
  });

  const { socket, messages, sendMessageToRoom } = useSocketStore((s) => s);

  const onSubmit = (values: z.infer<typeof chatFormSchema>) => {
    sendMessageToRoom(String(roomID), values.chatMessage);
    form.setValue("chatMessage", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="relative max-h-full min-h-screen">
      <div className="p-3 flex border-b items-center">
        <div className="flex items-center gap-2">
          <Avatar className="border w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" alt="Image" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <p className="text-sm font-medium leading-none">{roomID}</p>
            <p className="text-xs text-muted-foreground">Active 2h ago</p>
          </div>
        </div>
        <div className="flex items-center gap-1 ml-auto">
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
        {messages.map((chat, index) => {
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
        })}
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
