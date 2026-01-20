import { galleryItems } from '@/lib/data';
import { notFound } from 'next/navigation';
import GalleryDetailClient from './gallery-detail-client';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export function generateStaticParams() {
    return galleryItems.map((item) => ({
        id: item.id,
    }));
}

export default async function GalleryDetailPage({ params }: PageProps) {
    const { id } = await params;
    const item = galleryItems.find((p) => p.id === id);

    if (!item) {
        notFound();
    }

    return <GalleryDetailClient item={item} />;
}
