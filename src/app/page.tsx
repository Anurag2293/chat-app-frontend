import Link from "next/link";
import Image from "next/image";

import Navbar from "./__components/navbar";
import "@/styles/homepage.css";

import { BASE_URL } from "@/lib/url";

export default function Home() {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Navbar />
      <main className="">
        <section className="bg-primary dark:bg-black dark:text-white py-12 md:py-24 lg:py-28">
          <div className="container grid items-end gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground dark:text-white sm:text-4xl md:text-5xl">
                Connect with friends and family {BASE_URL}
              </h1>
              <p className="max-w-[600px] text-primary-foreground/80 dark:text-gray-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Chatter is a modern chat app that makes it easy to stay
                connected with the people who matter most. With features like
                instant messaging, voice and video calls, and group chats, you
                can keep in touch no matter where you are.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/chat"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary border shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Go To Chat
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
            <div>
              <div className="hero-card p-0 mx-auto sm:w-full lg:w-3/4 z-0 relative after:absolute after:h-full after:w-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-z-10 after:box-content after:p-1 after:rounded-xl before:absolute before:h-full before:w-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:box-content before:p-1 before:rounded-xl before:blur-[1.5rem] before:opacity-50 ">
                <Image
                  src="/image3.jpeg"
                  width={550}
                  height={400}
                  alt="Chatter App"
                  className="overflow-hidden rounded-xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
