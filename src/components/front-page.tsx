
import Link from "next/link";
import Image from "next/image";
import MessageCircleIcon from "./icons/message-circle";

export default function FrontPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
                <div className="container flex items-center justify-between">
                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                        <MessageCircleIcon className="h-6 w-6" />
                        <span className="text-xl font-bold">Chatter</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-primary-foreground bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="bg-primary py-12 md:py-24 lg:py-28">
                    <div className="container grid items-end gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
                                Connect with friends and family
                            </h1>
                            <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Chatter is a modern chat app that makes it easy to stay connected with the people who matter most. With
                                features like instant messaging, voice and video calls, and group chats, you can keep in touch no matter
                                where you are.
                            </p>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    href="#"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    Download App
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        <div className="grid">
                            <Image
                                src="/image3.jpeg"
                                width={550}
                                height={400}
                                alt="Chatter App"
                                className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:w-3/4"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}