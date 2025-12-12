"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, MessageCircleQuestion, LogIn } from "lucide-react";
import { DiscordLogo } from "@/components/icons";
import { cn } from "@/lib/utils";
import React from "react";
import { AiChat } from "../ai-chat";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <DiscordLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold">Parade Palace</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {/*
            <Button variant="outline" size="icon" onClick={() => setIsAiChatOpen(true)}>
              <MessageCircleQuestion className="h-5 w-5" />
              <span className="sr-only">Ask AI</span>
            </Button>
            */}
            <Button asChild>
              <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                Join Discord
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {/*
            <Button variant="outline" size="icon" onClick={() => setIsAiChatOpen(true)}>
              <MessageCircleQuestion className="h-5 w-5" />
              <span className="sr-only">Ask AI</span>
            </Button>
            */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2">
                    <DiscordLogo className="h-8 w-8 text-primary" />
                    <span className="font-headline text-xl font-bold">Parade Palace</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
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
                  </nav>
                  <Button className="mt-4" asChild>
                    <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                      Join Discord
                      <LogIn className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <AiChat open={isAiChatOpen} onOpenChange={setIsAiChatOpen} />
    </>
  );
}
