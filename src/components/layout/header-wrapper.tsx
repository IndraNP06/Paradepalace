'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header';

export default function HeaderWrapper() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return null;
    }

    return <Header />;
}
