import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image src="/asset/Carena_server.png" alt="Carena Logo" width={32} height={32} className="h-8 w-8 object-cover rounded-none" style={{ imageRendering: 'pixelated' }} />
            <span className="font-headline text-xl font-bold tracking-tight">Carena</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs text-center sm:text-left">
            © {currentYear} Carena. <br className="sm:hidden" />100% bebas bug (Semoga)
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button variant="ghost" size="icon" className="group hover:bg-primary/10 rounded-none transition-all border border-transparent hover:border-primary/20" asChild>
            <Link href="https://x.com/enr_cho?t=itNM4NLZqPNPghgdmjkS3g&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button> */}
          <Button variant="ghost" size="icon" className="group hover:bg-primary/10 rounded-none transition-all border border-transparent hover:border-primary/20" asChild>
            <Link href="https://www.instagram.com/akuchico/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="group hover:bg-primary/10 rounded-none transition-all border border-transparent hover:border-primary/20" asChild>
            <Link href="https://www.youtube.com/@Aku_Chico" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
