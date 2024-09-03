import Link from "next/link";
import Image from "next/image";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import { SignUpButton } from "../components/navbar/signup-button";
import Navbar from "@/components/navbar";

import "@/styles/homepage.css";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-screen flex flex-col">
      <Navbar session={session} />
      <main className="w-full flex-grow">
        <section className="py-12 md:py-22 lg:py-24">
          <div className="container grid items-end gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Connect with friends and family
              </h1>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Chatter is a modern chat app that makes it easy to stay
                connected with the people who matter most. With features like
                instant messaging, voice and video calls, and group chats, you
                can keep in touch no matter where you are.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {(session && session.user) &&
                  <Link
                    href="/chat"
                    prefetch={false}
                  >
                    <Button size="lg">
                      Go To Chat
                    </Button>
                  </Link>
                }
                {(!session || !session.user) && <SignUpButton content="Sign Up" />}
              </div>
            </div>
            <div>
              <div className="hero-card p-0 mx-auto sm:w-full lg:w-3/4 z-0 relative after:absolute after:h-full after:w-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-z-10 after:box-content after:p-1 after:rounded-xl before:absolute before:h-full before:w-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:box-content before:p-1 before:rounded-xl before:blur-[1.5rem] before:opacity-50">
                <Image
                  src="/hero-image.webp"
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
