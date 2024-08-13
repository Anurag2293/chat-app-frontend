
"use client"

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

import { useRouter } from 'next/navigation'
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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
	room: z.string().min(1, {
		message: "Enter a valid room name.",
	}),
});

export default function Home() {
	const router = useRouter();
	const { toast } = useToast();
	const [socket, setSocket] = useState<Socket | null>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			room: "",
		},
	})

	useEffect(() => {
		const initalizeSocket = () => {
			const newSocket = io("http://localhost:8080");
			setSocket(newSocket);
		}
		initalizeSocket();
	}, [])

	useEffect(() => {
		if (socket) {
			socket.on("connect", () => {
				console.log("Connected to server: ", socket.id);
				return toast({
					description: "Connected to server: " + socket.id,
				});
			});

			socket.on("disconnect", () => {
				console.log("Disconnected to server: ", socket.id);
				return toast({
					variant: "destructive",
					description: "Disconnected from server.",
					// action: <ToastAction altText="Try again">Try again</ToastAction>,
				});
			});
		}

	}, [socket, setSocket]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!socket) {
			return toast({
				variant: "destructive",
				title: "Socket connection doesn't exists",
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
		}
		socket.emit("join", values.room, (error: string) => {
			if (error) {
				return toast({
					variant: "destructive",
					title: "Error joining room!",
					description: error
				});
			}
			router.push("/chat");
			toast({
				description: "Joined room successfully!"
			});
		});
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
	)
}
