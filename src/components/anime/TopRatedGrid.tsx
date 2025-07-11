import type { Anime } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';

interface TopRatedGridProps {
  topRatedAnime: Anime[];
}

export default function TopRatedGrid({ topRatedAnime }: TopRatedGridProps) {
  return (
    <div className="space-y-4">
      {topRatedAnime.slice(0, 5).map((anime, index) => (
        <Link href={`/anime/${anime.id}`} key={anime.id} className="block group">
          <Card className="flex items-center gap-4 p-3 transition-colors hover:bg-muted/50">
            <div className="text-3xl font-bold text-muted-foreground w-8 text-center">{index + 1}</div>
            <div className="w-16 h-24 relative flex-shrink-0">
                <Image
                    src={anime.coverImage?.large || 'https://placehold.co/64x96.png'}
                    alt={anime.title.english || anime.title.romaji || 'Anime cover'}
                    fill
                    className="rounded-md object-cover"
                    sizes="64px"
                    data-ai-hint="anime manga"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate group-hover:text-primary transition-colors">{anime.title.english || anime.title.romaji}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                   {anime.averageScore && (
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{anime.averageScore / 10}</span>
                    </div>
                   )}
                   <span>{anime.format?.replace(/_/g, ' ')}</span>
                </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
