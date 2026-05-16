'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Youtube, ArrowLeft, Loader2, Calendar, Shield, Hash, MapPin, Link as LinkIcon, Sparkles, Mail } from 'lucide-react';
import Link from 'next/link';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FadeIn } from '@/components/fade-in';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      try {
        const docRef = doc(db, "team_members", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMember({ id: docSnap.id, ...docSnap.data() });
        } else {
          setMember(null);
        }
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold">Member not found</h1>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  // Format Join Date
  let joinDate = "Unknown";
  if (member.createdAt instanceof Timestamp) {
    joinDate = member.createdAt.toDate().toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' });
  } else if (member.createdAt) {
    joinDate = new Date(member.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-foreground overflow-x-hidden">
      {/* Dynamic Background Elements */}
      {/* Background is handled globally by PixelStars */}

      <div className="container max-w-4xl mx-auto p-4 pt-24 pb-20">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline" className="group gap-2 font-headline uppercase text-muted-foreground hover:text-primary transition-all border-4 border-white/10 bg-background hover:bg-primary/10 rounded-none shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_0_0_rgba(255,255,255,0.1)] hover:translate-y-[2px] hover:translate-x-[2px]" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-xs">BACK TO MENU</span>
            </Link>
          </Button>
        </div>

        <FadeIn>
          <div className="relative rounded-none bg-card/80 backdrop-blur-xl border-4 border-white/10 shadow-[12px_12px_0_0_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Banner Section */}
            <div className="h-48 sm:h-64 w-full bg-secondary relative overflow-hidden border-b-4 border-white/10">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="px-6 sm:px-10 pb-10 relative">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-6 relative -mt-20 sm:-mt-24 mb-8">
                {/* Avatar */}
                <div className="flex-shrink-0 relative group mx-auto sm:mx-0">
                  <div className="absolute -inset-1 bg-primary opacity-0 group-hover:opacity-100 transition duration-300 blur-sm" />
                  <Avatar className="h-40 w-40 sm:h-48 sm:w-48 border-[6px] border-background shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative rounded-none">
                    <AvatarImage src={member.avatar} alt={member.name} className="object-cover" style={{ imageRendering: 'pixelated' }} />
                    <AvatarFallback className="text-5xl font-headline font-bold bg-primary text-primary-foreground rounded-none">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Status Indicator */}
                  <div className="absolute bottom-[-10px] right-[-10px] h-8 w-8 rounded-none bg-green-500 border-[4px] border-background shadow-[2px_2px_0_0_rgba(0,0,0,1)]" title="Online" />
                </div>

                {/* Name & Actions */}
                <div className="flex-1 pt-20 sm:pt-24 text-center sm:text-left space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-headline uppercase font-bold tracking-tight mb-4 flex items-center justify-center sm:justify-start gap-3 text-primary">
                        {member.name}
                        {member.role === 'Owner' && <Sparkles className="h-8 w-8 text-yellow-500 fill-yellow-500" />}
                      </h1>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        {member.role && (
                          <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary hover:bg-primary/30 border-2 border-primary/50 rounded-none">
                            <Shield className="w-3 h-3 mr-1.5" />
                            {member.role}
                          </Badge>
                        )}
                        <span className="flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground bg-background px-3 py-1 rounded-none border-2 border-white/10 shadow-[2px_2px_0_0_rgba(255,255,255,0.05)]">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          JOINED: {joinDate}
                        </span>
                      </div>
                    </div>

                    {/* Social Actions */}
                    <div className="flex items-center justify-center gap-2">
                      {member.socials && Object.entries(member.socials).map(([key, url]) => {
                        if (url) {
                          const Icon = socialIcons[key] || socialIcons.twitter;
                          return (
                            <Button key={key} size="icon" variant="outline" className="h-12 w-12 rounded-none border-4 border-white/10 bg-background/80 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] hover:translate-y-[2px] hover:translate-x-[2px]" asChild>
                              <Link href={url as string} target="_blank" rel="noopener noreferrer">
                                <Icon className="h-5 w-5" />
                              </Link>
                            </Button>
                          )
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About Section */}
                  <Card className="bg-background/80 backdrop-blur-md border-4 border-white/10 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] rounded-none">
                    <CardHeader className="border-b-4 border-white/10 pb-4">
                      <CardTitle className="text-xl font-headline uppercase font-bold flex items-center gap-2 text-primary">
                        <Hash className="h-5 w-5" />
                        CHARACTER LORE
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground leading-relaxed text-lg font-body">
                        {member.about || "Belum ada deskripsi diri."}
                        {!member.about && "Halo! Saya adalah bagian dari komunitas Carena yang luar biasa ini."}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Contributions / Stats (Removed) */}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <Card className="bg-background/80 backdrop-blur-md border-4 border-white/10 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] rounded-none h-full">
                    <CardHeader className="border-b-4 border-white/10 pb-4">
                      <CardTitle className="text-lg font-headline uppercase font-bold text-accent">PLAYER STATS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-center justify-between p-3 rounded-none border-2 border-white/10 bg-black/40">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> LOC
                        </span>
                        <span className="font-bold text-sm uppercase">Indonesia</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-none border-2 border-white/10 bg-black/40">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" /> COMMS
                        </span>
                        <span className="font-bold text-sm uppercase">Discord</span>
                      </div>

                      <div className="pt-6 mt-4">
                        <h4 className="text-sm font-headline font-bold mb-4 text-primary uppercase">ACHIEVEMENTS</h4>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="outline" className="px-3 py-1.5 font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-500 border-2 border-yellow-500/50 hover:bg-yellow-500/30 rounded-none shadow-[2px_2px_0_0_rgba(234,179,8,0.3)]">
                            Warga Carena
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1.5 font-bold uppercase tracking-widest bg-blue-500/20 text-blue-500 border-2 border-blue-500/50 hover:bg-blue-500/30 rounded-none shadow-[2px_2px_0_0_rgba(59,130,246,0.3)]">
                            Verified
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
