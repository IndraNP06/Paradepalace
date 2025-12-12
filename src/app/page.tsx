'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { serverStats, teamMembers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/fade-in';
import { Typewriter } from '@/components/typewriter';
import { CountUp } from '@/components/count-up';
import { useEffect, useState } from 'react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const [stats, setStats] = useState(serverStats);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        // If we get valid data (and not just zeros/error), update the stats
        if (data.totalMembers > 0 || data.onlineMembers > 0) {
          setStats(prev => prev.map(s => {
            if (s.label === "Total Anggota") return { ...s, value: data.totalMembers.toString() };
            if (s.label === "Online Sekarang") return { ...s, value: data.onlineMembers.toString() };
            if (s.label === "Bot") return { ...s, value: data.botCount.toString() };
            return s;
          }));
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="absolute inset-0 -z-10 object-cover brightness-[.3]"
          />
        )}
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeIn delay={0.2}>
              <div className="text-center lg:text-left">
                <Typewriter
                  texts={[
                    'Welcome to Parade Palace',
                    'The Ultimate Community',
                  ]}
                  className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                  textClassName="text-primary"
                />
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 font-body lg:mx-0">
                  The ultimate community for gamers, creators, and tech enthusiasts. Join the conversation, participate in events, and make new friends.
                </p>
                <div className="mt-10">
                  <Button size="lg" className="text-lg shadow-lg shadow-primary/30 transition-transform hover:scale-105" asChild>
                    <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                      Join Discord Now
                      <LogIn className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex justify-center">
                <Image
                  src="/pp_dc.png"
                  alt="Parade Palace Mascot"
                  width={400}
                  height={400}
                  className="rounded-full shadow-2xl shadow-primary/20 aspect-square object-cover"
                  data-ai-hint="anime mascot"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={0.2 * (index + 1)}>
                <Card className="border-border/50 bg-card/80 text-center transition-transform hover:scale-105 hover:border-primary h-full">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-headline text-4xl font-bold text-foreground">
                      <CountUp to={parseInt(stat.value.replace(/,/g, ''))} />
                    </p>
                    <p className="mt-2 text-base text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The people who make Parade Palace a great place to be.
              </p>
            </div>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.id} delay={0.2 * (index + 1)}>
                <Link href={`/profile/${member.id}`} passHref>
                  <Card className="flex flex-col items-center justify-center p-8 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2 h-full">
                    <Avatar className="w-24 h-24 border-4 border-primary/50 mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                    <p className="text-sm text-primary font-semibold">{member.role}</p>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
