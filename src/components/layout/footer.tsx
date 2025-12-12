import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NexusLogo } from "@/components/icons";
import { Twitter, Instagram, Twitch } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 sm:items-start">
           <Link href="/" className="flex items-center gap-2">
            <NexusLogo className="h-7 w-7 text-primary" />
            <span className="font-headline text-lg font-bold">Parade Palace</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Parade Palace. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitch">
              <Twitch className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
