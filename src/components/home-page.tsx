'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/fade-in';
import { Typewriter } from '@/components/typewriter';
import { CountUp } from '@/components/count-up';
import { Badge } from '@/components/ui/badge';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

import { serverStats } from '@/lib/data';

interface HomePageProps {
    stats: {
        totalMembers: string;
        onlineMembers: string;
        offlineMembers: string;
    };
    team: any[];
}

export function HomePage({ stats, team }: HomePageProps) {
    // Merge the passed stats with the static configuration (icons, labels)
    const displayStats = serverStats.map(s => {
        if (s.label === "Total Anggota") return { ...s, value: stats.totalMembers };
        if (s.label === "Online Sekarang") return { ...s, value: stats.onlineMembers };
        if (s.label === "Anggota Offline") return { ...s, value: stats.offlineMembers };
        return s;
    });

    return (
        <div className="flex flex-col w-full overflow-hidden">
            {/* Hero Section */}
            <section className="relative w-full py-24 sm:py-32 lg:py-40 min-h-[85vh] flex items-center justify-center overflow-hidden">
                {heroImage && (
                    <>
                        <Image
                            src="/asset/carane_server.png"
                            alt="Carane Hero Background"
                            fill
                            className="absolute inset-0 -z-20 object-cover brightness-[.15]"
                            style={{ imageRendering: 'pixelated' }}
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
                                    'Selamat Datang di Carane',
                                    'Komunitas Discord'
                                ]}
                                className="font-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
                                textClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400"
                            />
                            <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-gray-300 font-body">
                                Komunitas terbaik untuk gamer, kreator, dan penggemar teknologi. Bergabunglah dalam percakapan, ikuti acara seru, dan cari teman baru.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Button size="lg" className="h-12 px-8 text-base font-bold transition-all rounded-none border-4 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0_0_rgba(255,255,255,0.2)] hover:translate-y-[2px] hover:translate-x-[2px] group uppercase tracking-widest" asChild>
                                    <Link href="https://discord.gg/MATaddGGZe" target="_blank" rel="noopener noreferrer">
                                        Gabung Discord Sekarang
                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold border-4 border-white/20 bg-black/50 hover:bg-white/10 backdrop-blur-sm rounded-none shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_0_0_rgba(255,255,255,0.1)] hover:translate-y-[2px] hover:translate-x-[2px] uppercase tracking-widest" asChild>
                                    <Link href="/gallery">
                                        Lihat Galeri
                                    </Link>
                                </Button>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4} className="flex justify-center relative w-full aspect-square max-w-md mx-auto lg:max-w-full">
                            {/* Decorative Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] -z-10" />
                            <div className="relative group w-full h-full flex items-center justify-center">
                                <div className="absolute inset-4 bg-gradient-to-tr from-primary/50 to-purple-600/50 opacity-0 group-hover:opacity-75 blur-xl transition duration-700 animate-tilt"></div>
                                <Image
                                    src="/asset/carane_server.png"
                                    alt="Carane Server Pixel Art"
                                    width={500}
                                    height={500}
                                    className="relative w-4/5 h-4/5 object-cover rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,0.8)] border-4 border-primary animate-float"
                                    style={{ imageRendering: 'pixelated' }}
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
                        {displayStats.map((stat, index) => (
                            <FadeIn key={stat.label} delay={0.2 * (index + 1)}>
                                <Card className="h-full border-4 border-white/10 bg-background/80 backdrop-blur-xl hover:bg-background/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] rounded-none">
                                    <CardContent className="p-8 flex flex-col items-center text-center">
                                        <div className="flex h-14 w-14 items-center justify-center border-2 border-primary bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors mb-4 rounded-none shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]">
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
                                Orang-orang berbakat yang bekerja di balik layar untuk menjadikan Carane komunitas yang aman dan menyenangkan.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((member, index) => (
                            <FadeIn key={member.id} delay={0.1 * (index + 1)}>
                                <Link href={`/profile/${member.id}`} passHref>
                                    <div className="group relative h-full">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition duration-300 blur-sm" />
                                        <Card className="relative h-full flex flex-col items-center p-8 bg-card border-4 border-white/10 rounded-none group-hover:bg-card/95 transition-all text-center shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] group-hover:-translate-y-1">
                                            <div className="relative mb-6">
                                                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <Avatar className="w-28 h-28 border-4 border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-500 rounded-none">
                                                    <AvatarImage src={member.avatar} alt={member.name} className="object-cover" style={{ imageRendering: 'pixelated' }} />
                                                    <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary rounded-none font-headline">{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {member.role?.toLowerCase() === 'owner' && (
                                                    <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground p-1.5 border-4 border-background shadow-[2px_2px_0_0_rgba(0,0,0,1)] z-10 rounded-none" title="Owner">
                                                        <Zap className="w-4 h-4 fill-current" />
                                                    </div>
                                                )}
                                            </div>

                                            <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-headline uppercase">{member.name}</CardTitle>
                                            <Badge variant="secondary" className="mb-4 px-3 py-1 bg-secondary/80 group-hover:bg-primary/20 group-hover:text-primary transition-colors border-2 border-white/10 rounded-none font-bold uppercase tracking-wider">
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
