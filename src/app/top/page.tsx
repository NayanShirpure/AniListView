import { searchAnime } from '@/lib/anilist';
import AnimeCard from '@/components/anime/AnimeCard';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Anime } from '@/lib/types';

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[...Array(20)].map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 mt-2 rounded" />
          <Skeleton className="h-3 w-1/2 mt-1 rounded" />
        </div>
      ))}
    </div>
  );
}

async function TopAnimeGrid() {
  const { media: topAnime } = await searchAnime({ sort: ['SCORE_DESC'], perPage: 20 });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {topAnime.map((anime: Anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export default function TopAnimePage() {
    return (
        <div className="space-y-8">
            <h1 className="font-headline text-3xl font-bold">Top Anime</h1>
             <Suspense fallback={<GridSkeleton />}>
                <TopAnimeGrid />
            </Suspense>
        </div>
    )
}
