import { galleryItems } from '@/lib/data';
import { notFound } from 'next/navigation';
import GalleryDetailClient from './gallery-detail-client';

interface PageProps {
    params: {
        id: string;
    };
}

export function generateStaticParams() {
    return galleryItems.map((item) => ({
        id: item.id,
    }));
}

export default function GalleryDetailPage({ params }: PageProps) {
    const item = galleryItems.find((p) => p.id === params.id);

    if (!item) {
        notFound();
    }

    return <GalleryDetailClient item={item} />;
}
