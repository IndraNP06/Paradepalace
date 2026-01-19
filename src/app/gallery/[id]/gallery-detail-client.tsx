'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { ImagePlaceholder } from '@/lib/placeholder-images';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryDetailClientProps {
    item: ImagePlaceholder;
}

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function GalleryDetailClient({ item }: GalleryDetailClientProps) {
    const [[page, direction], setPage] = useState([0, 0]);

    const allImages = [item.imageUrl, ...(item.additionalImages || [])];
    const hasMultipleImages = allImages.length > 1;

    // We wrap the index to ensure it's always valid
    const imageIndex = ((page % allImages.length) + allImages.length) % allImages.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
            <Card className="mx-auto w-full max-w-4xl overflow-hidden bg-[#1e1e1e] border-white/5 p-6 md:p-8">
                <div className="mb-6 flex flex-col gap-2">
                    <h1 className="font-headline text-2xl font-bold text-[#4ade80] md:text-3xl">
                        {item.description}
                    </h1>
                    {item.date && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>Posted on {item.date}</span>
                        </div>
                    )}
                </div>

                <div className="relative mb-8 overflow-hidden rounded-lg bg-black/20 group aspect-video w-full">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute h-full w-full"
                        >
                            <Image
                                src={allImages[imageIndex]}
                                alt={`${item.description} - Image ${imageIndex + 1}`}
                                fill
                                className="object-cover"
                                priority
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {hasMultipleImages && (
                        <>
                            <button
                                onClick={() => paginate(-1)}
                                className="absolute z-10 left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={() => paginate(1)}
                                className="absolute z-10 right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                            <div className="absolute z-10 bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                                {allImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-2 w-2 rounded-full transition-all ${idx === imageIndex ? 'bg-white w-4' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <Link href="/gallery">
                    <Button variant="secondary" className="gap-2 bg-[#2d2d2d] text-white hover:bg-[#3d3d3d] border-0">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Galeri
                    </Button>
                </Link>
            </Card>
        </div>
    );
}
