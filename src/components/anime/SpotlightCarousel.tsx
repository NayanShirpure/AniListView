
'use client';
import type { Anime } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clapperboard, Clock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface SpotlightCarouselProps {
  trendingAnime: Anime[];
}

export default function SpotlightCarousel({
  trendingAnime,
}: SpotlightCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full h-[450px] rounded-lg overflow-hidden group">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {trendingAnime.map((anime, index) => (
            <div key={anime.id} className="flex-[0_0_100%] relative h-full">
              <Image
                src={anime.bannerImage || anime.coverImage.extraLarge || 'https://placehold.co/1200x450/22132D/F2EFFF.png'}
                alt={anime.title.english || anime.title.romaji || ''}
                fill
                priority={index === 0}
                className="object-cover"
                data-ai-hint="anime landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <div className="max-w-xl text-foreground">
                    <p className='text-primary font-semibold mb-2'>#{index + 1} Spotlight</p>
                    <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">{anime.title.english || anime.title.romaji}</h2>
                    <div className='flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4'>
                        {anime.format && <span className='flex items-center gap-1.5'><Clapperboard className="w-4 h-4" /> {anime.format.replace(/_/g, " ")}</span>}
                        {anime.duration && <span className='flex items-center gap-1.5'><Clock className="w-4 h-4" /> {anime.duration}m</span>}
                        {anime.startDate?.year && <span className='flex items-center gap-1.5'><Calendar className="w-4 h-4" /> {new Date(anime.startDate.year, anime.startDate.month -1, anime.startDate.day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</span>}
                        {anime.episodes && <Badge variant="outline">HD</Badge>}
                        {anime.episodes && <Badge variant="outline">{anime.episodes}</Badge>}
                    </div>

                    <p className="text-muted-foreground line-clamp-3 mb-6">{anime.description?.replace(/<br>/g, ' ')}</p>
                    <div className="flex items-center gap-4">
                        <Button asChild size="lg">
                            <Link href={`/anime/${anime.id}`}>
                                <PlayCircle /> Watch Now
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href={`/anime/${anime.id}`}>
                                Details <ChevronRight />
                            </Link>
                        </Button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button size="icon" variant="secondary" onClick={scrollPrev} className="rounded-full">
            <ChevronLeft />
        </Button>
        <Button size="icon" variant="secondary" onClick={scrollNext} className="rounded-full">
            <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
