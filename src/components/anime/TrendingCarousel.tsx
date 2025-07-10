import type { Anime } from '@/lib/types';
import AnimeCard from './AnimeCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface TrendingCarouselProps {
  trendingAnime: Anime[];
}

export default function TrendingCarousel({ trendingAnime }: TrendingCarouselProps) {
  return (
    <div className="relative">
      <Carousel opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {trendingAnime.map((anime) => (
            <CarouselItem key={anime.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <AnimeCard anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 translate-x-1/2" />
      </Carousel>
    </div>
  );
}
