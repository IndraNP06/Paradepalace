'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { rankingSystem, specialRoles, uniqueBots } from '@/lib/data';
import { Award, Bot, ShieldCheck, Trophy } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

export default function FeaturesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Fitur <span className="text-primary">Server</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Jelajahi sistem unik dan bot yang menjadikan Parade Palace komunitas yang hidup dan menarik.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-16">
        {/* Ranking System Section */}
        {/*
        <FadeIn>
          <div>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                <Award className="inline-block mr-3 h-8 w-8 text-primary" />
                Sistem Peringkat
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Naik level dengan berpartisipasi dalam komunitas dan buka hadiah baru di setiap tingkatan.
              </p>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" aria-hidden="true"></div>
              <div className="space-y-12">
                {rankingSystem.map((rank, index) => (
                  <FadeIn key={rank.level} delay={0.2 * (index + 1)}>
                    <div className="relative flex items-center">
                      <div className="w-1/2 pr-8 text-right">
                        {(index % 2 === 0) && (
                          <Card className="transition-all hover:shadow-lg hover:shadow-primary/10 text-left">
                            <CardHeader>
                              <CardTitle className="font-headline text-2xl text-primary">{rank.level}</CardTitle>
                              <CardDescription>{rank.requirement}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{rank.description}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                      <div className="absolute left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2" aria-hidden="true"></div>
                      <div className="w-1/2 pl-8 text-left">
                        {(index % 2 !== 0) && (
                          <Card className="transition-all hover:shadow-lg hover:shadow-primary/10">
                            <CardHeader>
                              <CardTitle className="font-headline text-2xl text-primary">{rank.level}</CardTitle>
                              <CardDescription>{rank.requirement}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{rank.description}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        */}

        {/* Special Roles Section */}
        <FadeIn>
          <div>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                <ShieldCheck className="inline-block mr-3 h-8 w-8 text-primary" />
                Role Spesial
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Dapatkan role unik untuk kontribusi dan pencapaian Anda di dalam komunitas.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {specialRoles.map((role, index) => (
                <FadeIn key={role.name} delay={0.2 * (index + 1)}>
                  <Card className="aspect-square w-64 text-center p-6 flex flex-col items-center justify-center transition-all hover:scale-105 hover:border-primary">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <role.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{role.name}</CardTitle>
                    <CardDescription className="mt-2">{role.description}</CardDescription>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Unique Bots Section */}
        <FadeIn>
          <div>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                <Bot className="inline-block mr-3 h-8 w-8 text-accent" />
                Bot Unik
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Bot kami yang Sediakan khusus untuk meningkatkan pengalaman server Anda.
              </p>
            </div>
            <div className="space-y-8 max-w-3xl mx-auto">
              {uniqueBots.map((bot, index) => (
                <FadeIn key={bot.name} delay={0.2 * (index + 1)}>
                  <Card className="flex flex-col sm:flex-row items-center p-6 gap-6 transition-all hover:shadow-lg hover:shadow-accent/10 h-full">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={bot.avatar} alt={bot.name} data-ai-hint="robot avatar" />
                      <AvatarFallback>{bot.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                      <CardTitle className="font-headline text-2xl text-accent">{bot.name}</CardTitle>
                      <CardDescription className="mt-2 text-base">{bot.description}</CardDescription>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Live Leaderboard Section */}
        <FadeIn>
          <div>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                <Trophy className="inline-block mr-3 h-8 w-8 text-primary" />
                Papan Peringkat Langsung
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Lihat siapa yang berada di puncak papan peringkat anggota kami secara real-time.
              </p>
            </div>
            <Card className="max-w-4xl mx-auto text-center p-12 bg-secondary/20 border-dashed border-2">
              <CardContent>
                <h3 className="text-2xl font-semibold text-muted-foreground">Papan Peringkat Segera Hadir...</h3>
                <p className="mt-2 text-muted-foreground">Fitur ini sedang dalam pengembangan. Nantikan pembaruannya!</p>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
