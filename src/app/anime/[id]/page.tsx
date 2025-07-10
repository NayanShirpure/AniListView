import { getAnimeDetails } from '@/lib/anilist';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Tv, Calendar, Users, Clapperboard, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimeDetail from '@/components/anime/AnimeDetail';

function AnimeDetailSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-48 md:h-64 lg:h-80 w-full rounded-lg" />
      <div className="container mx-auto px-4 -mt-20 md:-mt-24">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Skeleton className="aspect-[2/3] w-full rounded-lg shadow-xl" />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 pt-28">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-8 w-48 mt-8 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function AnimeData({ id }: { id: number }) {
  const anime = await getAnimeDetails(id);
  if (!anime) {
    notFound();
  }
  return <AnimeDetail anime={anime} />;
}

export default function AnimeDetailsPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  return (
    <Suspense fallback={<AnimeDetailSkeleton />}>
      <AnimeData id={id} />
    </Suspense>
  );
}
