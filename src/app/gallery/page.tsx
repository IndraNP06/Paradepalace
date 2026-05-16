'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { memberOfTheMonth } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Sparkles, ImageIcon, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface GalleryItem {
  id: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? galleryItems.filter(item => (item.category || "Random") === selectedCategory)
    : galleryItems;

  const getCategoryCover = (categoryName: string) => {
    const item = galleryItems.find(item => (item.category || "Random") === categoryName);
    if (item?.imageUrl) return item.imageUrl;
    
    // Default fallback placeholders
    if (categoryName === "Meet") return PlaceHolderImages.find(img => img.id === "gallery-1")?.imageUrl || "/asset/Carena_server.png";
    if (categoryName === "Art") return PlaceHolderImages.find(img => img.id === "gallery-2")?.imageUrl || "/asset/Carena_server.png";
    return PlaceHolderImages.find(img => img.id === "gallery-3")?.imageUrl || "/asset/Carena_server.png";
  };

  useEffect(() => {
    async function fetchGallery() {
      try {
        const q = query(collection(db, "gallery_items"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryItem[];
        setGalleryItems(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        // Fallback unsorted
        try {
          const querySnapshot = await getDocs(collection(db, "gallery_items"));
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GalleryItem[];
          setGalleryItems(data);
        } catch (e) { }
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <ImageIcon className="h-4 w-4" />
              <span>Dokumentasi Server</span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Galeri <span className="text-primary">Komunitas</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              Koleksi momen terbaik, kenangan seru, dan kreativitas tanpa batas dari warga Carena.
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : selectedCategory === null ? (
          /* Bento Grid Categories */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {/* Meet Card */}
            <FadeIn delay={0.1} className="h-full col-span-1 md:col-span-2 lg:col-span-2">
              <div
                onClick={() => setSelectedCategory("Meet")}
                className="cursor-pointer group relative h-full min-h-[300px] overflow-hidden rounded-3xl bg-muted border-2 border-white/5 shadow-xl transition-all hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <Image
                  src={getCategoryCover("Meet")}
                  alt="Meet Category"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Meet</h3>
                  <p className="text-gray-300">Dokumentasi kumpul-kumpul warga Carena.</p>
                </div>
              </div>
            </FadeIn>

            {/* Art Card */}
            <FadeIn delay={0.2} className="h-full col-span-1 lg:col-span-1">
              <div
                onClick={() => setSelectedCategory("Art")}
                className="cursor-pointer group relative h-full min-h-[300px] overflow-hidden rounded-3xl bg-muted border-2 border-white/5 shadow-xl transition-all hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <Image
                  src={getCategoryCover("Art")}
                  alt="Art Category"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Art</h3>
                  <p className="text-gray-300">Karya seni dan kreativitas.</p>
                </div>
              </div>
            </FadeIn>

            {/* Random Card */}
            <FadeIn delay={0.3} className="h-full col-span-1 md:col-span-2 lg:col-span-3">
              <div
                onClick={() => setSelectedCategory("Random")}
                className="cursor-pointer group relative h-full min-h-[300px] overflow-hidden rounded-3xl bg-muted border-2 border-white/5 shadow-xl transition-all hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <Image
                  src={getCategoryCover("Random")}
                  alt="Random Category"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">Random</h3>
                  <p className="text-gray-300">Momen lucu dan hal acak lainnya.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        ) : (
          /* Photo Grid for Selected Category */
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-3xl font-bold">Kategori: <span className="text-primary">{selectedCategory}</span></h2>
              <Button variant="outline" onClick={() => setSelectedCategory(null)} className="rounded-full border-primary/20 hover:bg-primary/10">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
              {filteredItems.map((item, index) => (
                <FadeIn key={item.id} delay={0.05 * (index + 1)} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-muted/20 content-visibility-auto break-inside-avoid">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.description}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <p className="text-white font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
              {filteredItems.length === 0 && (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-lg">Belum ada foto dalam kategori ini.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hall of Fame Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-primary/5 to-purple-600/5 blur-3xl -z-10 rounded-full" />

          <FadeIn>
            <div className="text-center mt-12 mb-16">
              <h2 className="font-headline text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
                <Crown className="h-10 w-10 text-yellow-500 fill-yellow-500/20" />
                Hall of Fame
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Menghormati anggota luar biasa yang telah memberikan kontribusi besar bagi komunitas.
              </p>
            </div>

            <div className="flex justify-center">
              <Card className="relative w-full max-w-2xl overflow-hidden border-yellow-500/20 bg-background/60 backdrop-blur-xl transition-all hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-50" />
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />

                <CardHeader className="relative text-center pb-2 pt-10">
                  <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm font-semibold text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Anggota Bulan Ini
                  </div>
                  <CardTitle className="font-headline text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600">
                    {memberOfTheMonth.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative flex flex-col items-center text-center gap-8 pb-12 px-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 blur opacity-75 group-hover:opacity-100 transition duration-500" />
                    <Avatar className="h-40 w-40 border-4 border-background shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                      <AvatarImage src={memberOfTheMonth.avatar} alt={memberOfTheMonth.name} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-yellow-100 text-yellow-700">
                        {memberOfTheMonth.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-background">
                      MVP
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl italic text-muted-foreground max-w-lg border-l-4 border-yellow-500/30 pl-6 text-left">
                    "{memberOfTheMonth.contribution}"
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
