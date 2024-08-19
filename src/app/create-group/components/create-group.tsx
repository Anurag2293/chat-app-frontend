"use client";

import type { User } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadIcon from "@/components/icons/upload";
import { postRoom } from "@/api/room";
import { useToast } from "@/components/ui/use-toast";

import { ProfileImageUploader } from "./upload-profile";

const createRoomformSchema = z.object({
  name: z.string().min(1, {
    message: "Enter a valid room name.",
  }),
  description: z.string(),
});

export default function CreateGroupComponent() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createRoomformSchema>>({
    resolver: zodResolver(createRoomformSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postRoom,
    onSuccess: (data) => {
      console.log({ data });
      // if (!data.result) {

      // }
      toast({
        title: "Successfully created room!"
      })
    },
    onError: (error) => {
      console.log({ error });
      toast({
        title: "Error creating room!",
        variant: "destructive"
      })
    }
  })

  function onSubmit(values: z.infer<typeof createRoomformSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center p-12">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create New Group</CardTitle>
          <CardDescription>
            Fill out the details to create a new group.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <CardContent className="gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a description for the group."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="grid gap-2 my-4">
                <Label htmlFor="profile-picture">Profile Picture</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" className="flex-1">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <div className="flex-1 text-sm text-muted-foreground">
                    JPG, PNG or GIF up to 1MB
                  </div>
                </div>
              </div> */}

              <ProfileImageUploader />
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { }}>
                Cancel
              </Button>
              <Button type="submit">{isPending ? "Creating Group..." : "Create Group"}</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* <MultiUploader /> */}
    </div>
  );
}

function RemainingInput() {
  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor="profile-picture">Profile Picture</Label>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex-1">
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <div className="flex-1 text-sm text-muted-foreground">
            JPG, PNG or GIF up to 5MB
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="members">Add Members</Label>
        <Select>
          <SelectTrigger id="members">
            <SelectValue placeholder="Select members" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john">John Doe</SelectItem>
            <SelectItem value="jane">Jane Smith</SelectItem>
            <SelectItem value="bob">Bob Johnson</SelectItem>
            <SelectItem value="alice">Alice Williams</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
