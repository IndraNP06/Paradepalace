import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import HeaderWrapper from '@/components/layout/header-wrapper';
import FooterWrapper from '@/components/layout/footer-wrapper';
import { AuthProvider } from '@/context/auth-context';
import PixelStars from '@/components/pixel-stars';

export const metadata: Metadata = {
  title: 'Carena | Discord Community',
  description: 'The official community for Carena.',
  icons: {
    icon: '/asset/Carena_server.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="relative flex min-h-dvh flex-col bg-background">
          <PixelStars />
          <AuthProvider>
            <HeaderWrapper />
            <main className="flex-1">{children}</main>
            <FooterWrapper />
          </AuthProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

