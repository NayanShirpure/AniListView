import { getTrendingAnime, getSeasonalAnime } from '@/lib/anilist';
import TrendingCarousel from '@/components/anime/TrendingCarousel';
import SeasonalGrid from '@/components/anime/SeasonalGrid';
import { getCurrentSeason } from '@/lib/utils';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function CarouselSkeleton() {
  return (
    <div className="flex space-x-4 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-1/2 pr-4 md:w-1/4 lg:w-1/6">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 mt-2 rounded" />
          <Skeleton className="h-3 w-1/2 mt-1 rounded" />
        </div>
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[...Array(10)].map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 mt-2 rounded" />
          <Skeleton className="h-3 w-1/2 mt-1 rounded" />
        </div>
      ))}
    </div>
  );
}

async function TrendingAnimeData() {
  const trending = await getTrendingAnime();
  return <TrendingCarousel trendingAnime={trending} />;
}

async function SeasonalAnimeData() {
  const seasonal = await getSeasonalAnime();
  return <SeasonalGrid seasonalAnime={seasonal} />;
}

export default async function HomePage() {
  const { season, year } = getCurrentSeason();

  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-headline text-3xl font-bold mb-4">Trending Now</h1>
        <Suspense fallback={<CarouselSkeleton />}>
          <TrendingAnimeData />
        </Suspense>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-4 capitalize">
          {season.toLowerCase()} {year} Season
        </h2>
        <Suspense fallback={<GridSkeleton />}>
          <SeasonalAnimeData />
        </Suspense>
      </section>
    </div>
  );
}
