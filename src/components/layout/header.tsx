"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Zap, MessageCircleQuestion, LogIn } from "lucide-react";
import { DiscordLogo } from "@/components/icons";
import { cn } from "@/lib/utils";
import React from "react";


const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/features", label: "Fitur" },
  { href: "/gallery", label: "Galeri" },
];

import { useAuth } from "@/context/auth-context";

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const { isAuthenticated, logout, user } = useAuth();


  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      <header className={cn(
        "w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        !isAdmin && "sticky top-0 z-50 shadow-sm"
      )}>
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <DiscordLogo className="h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            <span className="font-headline text-xl font-bold tracking-tight">Parade Palace</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all hover:text-primary relative group py-2",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
                  pathname === link.href && "scale-x-100"
                )} />
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/admin" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden items-center gap-4 md:flex">


            {isAuthenticated && (
              <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-foreground">
                Logout
              </Button>
            )}

            <Button asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 h-10 px-6 font-semibold">
              <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                Gabung Discord
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-white/10 bg-background/95 backdrop-blur-xl">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigation menu for mobile devices</SheetDescription>
                <div className="flex flex-col gap-8 p-6">
                  <Link href="/" className="flex items-center gap-2">
                    <DiscordLogo className="h-8 w-8 text-primary" />
                    <span className="font-headline text-xl font-bold">Parade Palace</span>
                  </Link>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === link.href ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {isAuthenticated && (
                      <Link
                        href="/admin"
                        onClick={() => setIsSheetOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === "/admin" ? "text-primary" : "text-foreground"
                        )}
                      >
                        Admin
                      </Link>
                    )}
                  </nav>

                  <div className="flex flex-col gap-4 mt-auto">
                    {isAuthenticated && (
                      <Button variant="outline" onClick={() => {
                        logout();
                        setIsSheetOpen(false);
                      }} className="w-full justify-start h-12">
                        <LogIn className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    )}

                    <Button asChild className="w-full shadow-lg shadow-primary/20 h-12">
                      <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                        Gabung Discord
                        <LogIn className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

    </>
  );
}

