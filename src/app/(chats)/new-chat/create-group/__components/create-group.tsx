"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Users, ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import UploadIcon from "@/components/icons/upload";
import { useToast } from "@/components/ui/use-toast";

import { patchRoomWithProfileImage, postRoom } from "@/api/room";
import { postUserRoom } from "@/api/user-room";

import { ProfileImageUploader } from "./upload-profile";
import { LoadingSpinner } from '@/components/loader';

const createRoomformSchema = z.object({
	name: z.string().min(1, {
		message: "Enter a valid room name.",
	}),
	description: z.string(),
});

export default function CreateGroup() {
	const router = useRouter();
	const [profileImageURL, setProfileImageURL] = useState<string>("");
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
		onSuccess: async (result) => {
			try {
				console.log({ result });
				if (!result.success) {
					throw new Error(result.message);
				}

				// Update Room with profile image
				await patchRoomWithProfileImage({
					roomID: result.data.id,
					profileImageURL,
				});

				// Update User Room with owner/creator of the room
				await postUserRoom({
					roomID: result.data.id,
					role: "OWNER"
				});

				// Route to the particular chat room
				router.push(`/chat/${result.data.id}`);

				toast({
					title: "Successfully created room!",
				});
			} catch (error) {
				return toast({
					title: (error as Error).message,
					variant: "destructive",
				});
			}
		},
		onError: () => {
			toast({
				title: "Error creating room!",
				variant: "destructive",
			});
		},
	});

	function onSubmit(values: z.infer<typeof createRoomformSchema>) {
		mutate(values);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
			<Card className="md:col-span-1 w-full shadow-none rounded-none border-none border-r">
				<CardHeader>
					<div className="flex items-center space-x-4">
						<Link href="/chat"><ArrowLeft /></Link>
						<CardTitle>New Group</CardTitle>
					</div>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<CardContent>

							<ProfileImageUploader
								profileImageURL={profileImageURL}
								setProfileImageURL={setProfileImageURL}
							/>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
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

						</CardContent>
						<CardFooter>
							<Button className="w-full" type="submit" disabled={isPending}>
								{!isPending && 'Create Group'}
								{isPending && <LoadingSpinner />}
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>

			<div className="md:col-span-2 hidden md:block border-l border-gray-200 dark:border-gray-800">
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
		</div>
	)
}