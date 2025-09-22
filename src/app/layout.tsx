import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MotionDiv } from '@/components/MotionDiv';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'AniListView - Discover Your Next Favorite Anime',
  description: 'Explore, discover, and track your favorite anime with AniListView. Powered by the AniList API.',
};

function HeaderSkeleton() {
  return (
    <div className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 flex items-center h-16">
        <Skeleton className="h-8 w-32" />
        <div className="hidden md:flex items-center gap-4 ml-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex-1" />
        <Skeleton className="h-9 w-64 hidden md:block" />
        <Skeleton className="h-9 w-9 md:hidden ml-4" />
      </div>
    </div>
  );
}

function HeaderWrapper() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />
    </Suspense>
  )
}

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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <HeaderWrapper />
          <MotionDiv
            tag="main"
            className="flex-grow container mx-auto px-4 py-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          >
            {children}
          </MotionDiv>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
