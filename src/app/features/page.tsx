'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { rankingSystem, specialRoles, uniqueBots } from '@/lib/data';
import { Award, Bot, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { useFeatureSettings } from '@/hooks/use-feature-settings';

export default function FeaturesPage() {
  const { settings, error } = useFeatureSettings();

  if (error) {
    console.error("Features Page Error:", error);
    // Optional: render a toast or banner
  }

  return (
    <div className="relative min-h-screen">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Fitur Unggulan</span>
            </div>
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Fitur <span className="text-primary">Server</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              Jelajahi ekosistem unik dan bot canggih yang menjadikan Carena komunitas yang hidup, interaktif, dan penuh warna.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-32">
          {/* Ranking System Section */}
          {settings.rankingSystem && (
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
          )}

          {/* Special Roles Section */}
          {settings.specialRoles && (
            <section>
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="font-headline text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    Role Spesial
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Dapatkan identitas unik sebagai penghargaan atas kontribusi Anda.
                  </p>
                </div>
              </FadeIn>

              <div className="flex flex-wrap justify-center gap-8">
                {specialRoles
                  .filter(role => !settings.hiddenRoleNames?.includes(role.name))
                  .map((role, index) => (
                    <FadeIn key={role.name} delay={0.1 * (index + 1)} className="w-full max-w-[350px]">
                      <div className="group relative h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md" />
                        <Card className="relative h-full flex flex-col items-center p-8 bg-background/60 backdrop-blur-xl border-white/5 group-hover:border-primary/20 transition-all duration-300 text-center rounded-2xl overflow-hidden hover:-translate-y-1">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner ring-1 ring-white/10">
                            <role.icon className="h-10 w-10 drop-shadow-sm" />
                          </div>

                          <CardTitle className="relative z-10 font-headline text-2xl font-bold mb-3">{role.name}</CardTitle>
                          <CardDescription className="relative z-10 text-base leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                            {role.description}
                          </CardDescription>
                        </Card>
                      </div>
                    </FadeIn>
                  ))}
              </div>
            </section>
          )}

          {/* Unique Bots Section */}
          {settings.exclusiveBots && (
            <section>
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="font-headline text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <Bot className="h-10 w-10 text-accent" />
                    Bot Eksklusif
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Teknologi untuk pengalaman server yang lebih baik.
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {uniqueBots.map((bot, index) => (
                  <FadeIn key={bot.name} delay={0.2 * (index + 1)}>
                    <Card className="group overflow-hidden border-white/5 bg-background/60 backdrop-blur-xl hover:bg-background/80 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row h-full">
                          <div className="relative p-8 flex flex-col items-center justify-center sm:w-1/3 bg-gradient-to-br from-accent/10 to-transparent border-b sm:border-b-0 sm:border-r border-white/5">
                            <div className="absolute inset-0 bg-accent/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Avatar className="h-24 w-24 border-4 border-background shadow-xl z-10 group-hover:scale-105 transition-transform duration-300">
                              <AvatarImage src={bot.avatar} alt={bot.name} />
                              <AvatarFallback className="text-2xl font-bold bg-accent text-accent-foreground">
                                {bot.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="p-8 sm:w-2/3 flex flex-col justify-center">
                            <CardTitle className="font-headline text-2xl font-bold text-accent mb-3 group-hover:text-accent/80 transition-colors">
                              {bot.name}
                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {bot.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </section>
          )}

          {/* Live Leaderboard Section */}
          {settings.globalLeaderboard && (
            <section>
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="font-headline text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <Trophy className="h-10 w-10 text-yellow-500" />
                    Global Leaderboard
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Pantau kompetisi dan lihat siapa yang mendominasi server saat ini.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="relative group max-w-3xl mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-primary/20 to-purple-600/20 rounded-3xl opacity-50 blur-lg group-hover:opacity-100 transition duration-500" />
                  <Card className="relative overflow-hidden bg-background/40 backdrop-blur-md border-white/10 p-12 text-center rounded-3xl">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                    <CardContent className="relative z-10 flex flex-col items-center">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-6 animate-pulse">
                        <Trophy className="h-10 w-10 text-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">Segera Hadir</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Sistem peringkat real-time kami sedang dalam tahap akhir pengembangan. Bersiaplah untuk bersaing di puncak klasemen!
                      </p>

                      <div className="mt-8 flex gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-bounce delay-0" />
                        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-bounce delay-100" />
                        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-bounce delay-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
