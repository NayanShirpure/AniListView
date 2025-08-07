import { getTrendingAnime, getSeasonalAnime, getTopRatedAnime, getUpcomingAnime } from '@/lib/anilist';
import TrendingCarousel from '@/components/anime/TrendingCarousel';
import SeasonalGrid from '@/components/anime/SeasonalGrid';
import { getCurrentSeason, getNextSeason } from '@/lib/utils';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import TopRatedGrid from '@/components/anime/TopRatedGrid';
import UpcomingCarousel from '@/components/anime/UpcomingCarousel';
import { MotionDiv } from '@/components/MotionDiv';
import SpotlightCarousel from '@/components/anime/SpotlightCarousel';

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

function SpotlightSkeleton() {
    return (
        <div className="w-full">
            <Skeleton className="h-[450px] w-full rounded-lg" />
        </div>
    )
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
  const trending = await getTrendingAnime(5); // Fetch top 5 for spotlight
  return <SpotlightCarousel trendingAnime={trending} />;
}

async function SeasonalAnimeData() {
  const seasonal = await getSeasonalAnime();
  return <SeasonalGrid seasonalAnime={seasonal} />;
}

async function TopRatedAnimeData() {
    const topRated = await getTopRatedAnime();
    return <TopRatedGrid topRatedAnime={topRated} />;
}

async function UpcomingAnimeData() {
    const upcoming = await getUpcomingAnime();
    return <UpcomingCarousel upcomingAnime={upcoming} />;
}

export default async function HomePage() {
  const { season, year } = getCurrentSeason();
  const nextSeason = getNextSeason();

  return (
    <div className="space-y-16">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section>
          <h1 className="sr-only">Anime Spotlight</h1>
          <Suspense fallback={<SpotlightSkeleton />}>
            <TrendingAnimeData />
          </Suspense>
        </section>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <section>
          <h2 className="font-headline text-3xl font-bold mb-6">Trending Now</h2>
          <Suspense fallback={<CarouselSkeleton />}>
            <TrendingCarousel trendingAnime={await getTrendingAnime()} />
          </Suspense>
        </section>
      </MotionDiv>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
        <MotionDiv
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
          <section>
            <h2 className="font-headline text-3xl font-bold mb-6 capitalize">
              Popular This Season - {season.toLowerCase()} {year}
            </h2>
            <Suspense fallback={<GridSkeleton />}>
              <SeasonalAnimeData />
            </Suspense>
          </section>
        </MotionDiv>
        <MotionDiv
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <section>
                <h2 className="font-headline text-3xl font-bold mb-6">Top Rated All Time</h2>
                <Suspense fallback={<GridSkeleton />}>
                    <TopRatedAnimeData />
                </Suspense>
            </section>
        </MotionDiv>
      </div>
      
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <section>
          <h2 className="font-headline text-3xl font-bold mb-6 capitalize">
            Upcoming Next Season - {nextSeason.season.toLowerCase()} {nextSeason.year}
          </h2>
          <Suspense fallback={<CarouselSkeleton />}>
            <UpcomingAnimeData />
          </Suspense>
        </section>
      </MotionDiv>

    </div>
  );
}
