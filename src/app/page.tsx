'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { serverStats } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogIn, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/fade-in';
import { Typewriter } from '@/components/typewriter';
import { CountUp } from '@/components/count-up';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const [stats, setStats] = useState(serverStats);
  const [team, setTeam] = useState<any[]>([]);
  const [isTeamLoading, setIsTeamLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.totalMembers > 0 || data.onlineMembers > 0) {
          setStats(prev => prev.map(s => {
            if (s.label === "Total Anggota") return { ...s, value: data.totalMembers.toString() };
            if (s.label === "Online Sekarang") return { ...s, value: data.onlineMembers.toString() };
            if (s.label === "Anggota Offline") return { ...s, value: data.offlineMembers.toString() };
            return s;
          }));
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }

    async function fetchTeam() {
      try {
        console.log("Attempting to fetch team from Firestore...");
        console.log("Firebase Config Check (Public):", {
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
        });

        const querySnapshot = await getDocs(collection(db, "team_members"));
        console.log(`Successfully fetched ${querySnapshot.size} team members.`);

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        data.sort((a: any, b: any) => {
          const dateA = a.createdAt?.seconds ? a.createdAt.seconds : new Date(a.createdAt || 0).getTime();
          const dateB = b.createdAt?.seconds ? b.createdAt.seconds : new Date(b.createdAt || 0).getTime();

          return dateA - dateB;
        });

        setTeam(data);
      } catch (error: any) {
        console.error("Error fetching team:", error);
        if (error.code === 'permission-denied') {
          console.error("PERMISSION DENIED: Check Firestore Security Rules. Ensure 'team_members' collection allows public read.");
        } else if (error.code === 'unavailable') {
          console.error("NETWORK ERROR: Check your internet connection or Firewalls.");
        }
      } finally {
        setIsTeamLoading(false);
      }
    }

    fetchStats();
    fetchTeam();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-24 sm:py-32 lg:py-40 min-h-[85vh] flex items-center justify-center overflow-hidden">
        {heroImage && (
          <>
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="absolute inset-0 -z-20 object-cover brightness-[.2]"
              priority
            />
            {/* Modern Gradient Overlays */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/80 to-background" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 opacity-animate" />
          </>
        )}
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:gap-20 lg:grid-cols-2">
            <FadeIn delay={0.2} className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <Typewriter
                texts={[
                  'Selamat Datang di Parade Palace',
                  'Komunitas Discord'
                ]}
                className="font-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
                textClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400"
              />
              <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-gray-300 font-body">
                Komunitas terbaik untuk gamer, kreator, dan penggemar teknologi. Bergabunglah dalam percakapan, ikuti acara seru, dan cari teman baru.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all rounded-full group" asChild>
                  <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                    Gabung Discord Sekarang
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full" asChild>
                  <Link href="/gallery">
                    Lihat Galeri
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="flex justify-center relative w-full aspect-square max-w-md mx-auto lg:max-w-full">
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[100px] -z-10" />
              <div className="relative group w-full h-full flex items-center justify-center">
                <div className="absolute inset-4 bg-gradient-to-tr from-primary/50 to-purple-600/50 rounded-full opacity-0 group-hover:opacity-75 blur-xl transition duration-700 animate-tilt"></div>
                <Image
                  src="/pp_dc.png"
                  alt="Parade Palace Mascot"
                  width={500}
                  height={500}
                  className="relative w-4/5 h-4/5 object-cover rounded-full shadow-2xl border-4 border-white/5 animate-float"
                  data-ai-hint="anime mascot"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-24 pb-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={0.2 * (index + 1)}>
                <Card className="h-full border-white/5 bg-background/60 backdrop-blur-xl hover:bg-background/80 transition-all duration-300 hover:scale-105 hover:border-primary/50 shadow-xl">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors mb-4">
                      <stat.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <p className="font-headline text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                      <CountUp to={parseInt(stat.value.replace(/,/g, ''))} />
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32 bg-secondary/5 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Temui <span className="text-primary">Tim Kami</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Orang-orang berbakat yang bekerja di balik layar untuk menjadikan Parade Palace komunitas yang aman dan menyenangkan.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <FadeIn key={member.id} delay={0.1 * (index + 1)}>
                <Link href={`/profile/${member.id}`} passHref>
                  <div className="group relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur" />
                    <Card className="relative h-full flex flex-col items-center p-8 bg-card border-white/5 group-hover:bg-card/95 transition-all text-center rounded-2xl hover:shadow-2xl">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Avatar className="w-28 h-28 border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-500">
                          <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                          <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {member.role?.toLowerCase() === 'owner' && (
                          <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black p-1.5 rounded-full border-4 border-card shadow-sm z-10" title="Owner">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                          </div>
                        )}
                      </div>

                      <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</CardTitle>
                      <Badge variant="secondary" className="mb-4 px-3 py-1 bg-secondary/50 group-hover:bg-primary/15 group-hover:text-primary transition-colors border-0">
                        {member.role}
                      </Badge>
                    </Card>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
