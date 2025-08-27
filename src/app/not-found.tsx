import Link from "next/link";
import { Cog, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Cog className="w-24 h-24 text-primary animate-spin-slow" />
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight font-headline sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Looks like you've taken a wrong turn. This page doesn't exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back to Home
        </Link>
      </Button>
    </div>
  );
}
