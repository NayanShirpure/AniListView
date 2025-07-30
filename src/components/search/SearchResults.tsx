
'use client';
import { useEffect, useState } from 'react';
import { searchAnime } from '@/lib/anilist';
import type { PageResult } from '@/lib/types';
import AnimeCard from '@/components/anime/AnimeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilters } from '@/hooks/use-filters';

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default function SearchResults() {
  const { filters, setFilter } = useFilters();
  const [results, setResults] = useState<PageResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const sortArray = filters.sort ? [filters.sort] : undefined;
    searchAnime({ ...filters, sort: sortArray })
      .then(data => {
        setResults(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilter('page', newPage);
  }

  if (loading) {
    return (
        <div>
            <Skeleton className="h-10 w-1/2 mb-6" />
            <GridSkeleton />
        </div>
    );
  }

  const query = filters.q;
  const page = filters.page || 1;
      
  return (
    <div className="space-y-8">
       <h1 className="font-headline text-3xl font-bold">
            {query ? `Search Results for "${query}"` : 'Browse Anime'}
        </h1>
      {results && results.media.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.media.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!results.pageInfo.hasNextPage && page === results.pageInfo.lastPage || page === 1}
              >
                  <ChevronLeft /> Previous
              </Button>
              <span>Page {results.pageInfo.currentPage} of {results.pageInfo.lastPage}</span>
              <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!results.pageInfo.hasNextPage}
              >
                  Next <ChevronRight />
              </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No results found for the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
