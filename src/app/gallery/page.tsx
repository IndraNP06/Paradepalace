'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { galleryItems, memberOfTheMonth } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

export default function GalleryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Galeri <span className="text-primary">Komunitas</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Foto-foto dalam komunitas Parade Palace.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
        {galleryItems.map((item, index) => (
          <FadeIn key={item.id} delay={0.1 * (index + 1)}>
            <Card className="overflow-hidden group relative h-full">
              <CardContent className="p-0">
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  data-ai-hint={item.imageHint}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Hall of Fame Section */}
      <FadeIn>
        <div className="text-center mt-20 mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            <Crown className="inline-block mr-3 h-8 w-8 text-yellow-400" />
            Hall of Fame
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Menghormati anggota yang telah memberikan dampak signifikan bagi komunitas kami.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-tr from-card to-secondary/30 border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/10">
          <CardHeader className="text-center">
            <p className="font-headline text-xl text-yellow-400">Anggota Bulan Ini</p>
            <CardTitle className="font-headline text-4xl">{memberOfTheMonth.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={memberOfTheMonth.avatar} alt={memberOfTheMonth.name} data-ai-hint={memberOfTheMonth.avatarHint} />
              <AvatarFallback>{memberOfTheMonth.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardDescription className="text-base max-w-md">{memberOfTheMonth.contribution}</CardDescription>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
