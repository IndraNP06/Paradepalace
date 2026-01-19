import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DiscordLogo } from "@/components/icons";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <DiscordLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold tracking-tight">Parade Palace</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs text-center sm:text-left">
            © {currentYear} Parade Palace. <br className="sm:hidden" />Hak Cipta Dilindungi.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="group hover:bg-primary/10 rounded-full transition-all" asChild>
            <Link href="https://x.com/enr_cho?t=itNM4NLZqPNPghgdmjkS3g&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="group hover:bg-primary/10 rounded-full transition-all" asChild>
            <Link href="https://www.instagram.com/co_andrson/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="group hover:bg-primary/10 rounded-full transition-all" asChild>
            <Link href="https://www.youtube.com/@chicho_8" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
