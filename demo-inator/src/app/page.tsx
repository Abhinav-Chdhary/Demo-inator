// src/app/page.tsx
import { Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 font-sans dark:bg-zinc-950">
      {/* Main content card */}
      <main className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white p-10 shadow-2xl dark:bg-zinc-900 sm:items-start sm:p-12">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
          <Presentation className="h-7 w-7 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-left sm:text-4xl">
          Demo-inator
        </h1>

        {/* Description */}
        <p className="text-center text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-left">
          Make tech demos like a Pro. 100% private & free.
        </p>

        {/* Call to Action Button */}
        <Button size="lg" className="w-full sm:w-auto">
          <Link href="/create">Get Started Now</Link>
        </Button>
      </main>
    </div>
  );
}
