"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useSocketStore } from "@/providers/socket-store-provider";

const formSchema = z.object({
  room: z.string().min(1, {
    message: "Enter a valid room name.",
  }),
});

export default function JoinRoom() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room: "",
    },
  });
  const { joinSocketRoom } = useSocketStore((state) => state);

  function onSubmit(values: z.infer<typeof formSchema>) {
    joinSocketRoom(values.room);
  }

  return (
    <div className="w-full md:w-1/2 mx-auto mt-5 p-4 border rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <FormControl>
                  <Input placeholder="Enter room..." {...field} />
                </FormControl>
                <FormDescription>
                  Enter the room you want to join.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
