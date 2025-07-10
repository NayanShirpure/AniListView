import type { Anime } from '@/lib/types';
import AnimeCard from './AnimeCard';

interface SeasonalGridProps {
  seasonalAnime: Anime[];
}

export default function SeasonalGrid({ seasonalAnime }: SeasonalGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {seasonalAnime.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
