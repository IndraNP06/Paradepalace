'use client';

import { use } from 'react';
import { teamMembers } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

// Simple component for TikTok icon as it's not in lucide-react
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.6 5.82a4.42 4.42 0 0 1-4.42-4.42v10.3a4.42 4.42 0 1 0 4.42-4.42zM12 11.72v-1.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v1.5a5.92 5.92 0 0 0-3.5 5.28H12a5.92 5.92 0 0 0-5.92-5.92H7.5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1h1.5a5.92 5.92 0 0 0 5.92-5.92V2.5a1 1 0 0 1-1-1H12a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1H16a1 1 0 0 1-1 1v7.72a4.42 4.42 0 0 1-3.08 4.28V20a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1H12a1 1 0 0 1 1-1v-2.78a4.42 4.42 0 0 1-3.08-4.28z" />
  </svg>
);


const socialIcons: { [key: string]: React.ElementType } = {
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTokIcon,
};

export default function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const member = teamMembers.find(m => m.id === slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full bg-gradient-to-r from-primary to-accent">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Avatar className="h-40 w-40 border-8 border-background shadow-lg">
              <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
              <AvatarFallback className="text-6xl">{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardHeader className="text-center pt-24 pb-6">
          <CardTitle className="font-headline text-4xl">{member.name}</CardTitle>
          <CardDescription className="text-primary font-bold text-lg">{member.role}</CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <h3 className="font-headline text-xl mb-4 text-muted-foreground">Connect with {member.name}</h3>
          <div className="flex justify-center gap-4">
            {Object.entries(member.socials).map(([key, url]) => {
              if (url) {
                const Icon = socialIcons[key];
                return (
                  <Button key={key} variant="outline" size="icon" asChild>
                    <Link href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                      <Icon className="h-5 w-5" />
                    </Link>
                  </Button>
                );
              }
              return null;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
