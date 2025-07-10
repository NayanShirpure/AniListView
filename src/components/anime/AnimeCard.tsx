import Image from 'next/image';
import Link from 'next/link';
import type { Anime } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface AnimeCardProps {
  anime: Partial<Anime>;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  if (!anime.id || !anime.title) return null;

  const titleText = anime.title.english || anime.title.romaji;

  return (
    <Link href={`/anime/${anime.id}`} className="block h-full group">
      <Card className="w-full h-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 border-border/50 bg-card">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3]">
            <Image
              src={anime.coverImage?.extraLarge || 'https://placehold.co/300x450/22132D/F2EFFF.png'}
              alt={titleText || 'Anime cover'}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              data-ai-hint="anime manga"
            />
            {anime.averageScore && (
              <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{anime.averageScore / 10}</span>
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 block">
          <p className="font-headline text-base font-semibold truncate text-foreground" title={titleText}>{titleText}</p>
          <div className="text-xs text-muted-foreground flex items-center justify-between mt-1">
            <span>{anime.format?.replace(/_/g, ' ')}</span>
            <span>{anime.season} {anime.seasonYear}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
