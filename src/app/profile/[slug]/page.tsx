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
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-20" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen opacity-20" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 blur-3xl scale-125"
          style={{ backgroundImage: `url(${member.avatar})` }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      <div className="container max-w-4xl mx-auto p-4 pt-24 pb-20">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" className="group gap-2 text-muted-foreground hover:text-primary transition-colors pl-0 hover:bg-transparent" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-lg font-medium">Kembali ke Beranda</span>
            </Link>
          </Button>
        </div>

        <FadeIn>
          <div className="relative rounded-3xl bg-card/50 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Banner Section */}
            <div className="h-48 sm:h-64 w-full bg-gradient-to-r from-primary/80 to-purple-600/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="px-6 sm:px-10 pb-10 relative">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-6 relative -mt-20 sm:-mt-24 mb-8">
                {/* Avatar */}
                <div className="flex-shrink-0 relative group mx-auto sm:mx-0">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
                  <Avatar className="h-40 w-40 sm:h-48 sm:w-48 border-[6px] border-background shadow-2xl relative">
                    <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                    <AvatarFallback className="text-5xl font-bold bg-primary text-primary-foreground">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Status Indicator */}
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-green-500 border-[5px] border-background" title="Online" />
                </div>

                {/* Name & Actions */}
                <div className="flex-1 pt-20 sm:pt-24 text-center sm:text-left space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 flex items-center justify-center sm:justify-start gap-3">
                        {member.name}
                        {member.role === 'Owner' && <Sparkles className="h-6 w-6 text-yellow-500 fill-yellow-500/20" />}
                      </h1>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        {member.role && (
                          <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                            <Shield className="w-3 h-3 mr-1.5" />
                            {member.role}
                          </Badge>
                        )}
                        <span className="flex items-center text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-white/5">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          Bergabung {joinDate}
                        </span>
                      </div>
                    </div>

                    {/* Social Actions */}
                    <div className="flex items-center justify-center gap-2">
                      {member.socials && Object.entries(member.socials).map(([key, url]) => {
                        if (url) {
                          const Icon = socialIcons[key] || socialIcons.twitter;
                          return (
                            <Button key={key} size="icon" variant="outline" className="h-10 w-10 rounded-full bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all" asChild>
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
                  <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        Tentang Saya
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {member.about || "Belum ada deskripsi diri."}
                        {!member.about && "Halo! Saya adalah bagian dari komunitas Parade Palace yang luar biasa ini."}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Contributions / Stats (Removed) */}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <Card className="bg-background/40 backdrop-blur-md border-white/5 shadow-sm h-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Informasi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> Lokasi
                        </span>
                        <span className="font-medium text-sm">Indonesia</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Kontak
                        </span>
                        <span className="font-medium text-sm">Via Discord</span>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Badge Komunitas</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20">
                            Warga Palace
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
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
