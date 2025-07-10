'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { searchAnime } from '@/lib/anilist';
import type { PageResult } from '@/lib/types';
import AnimeCard from '@/components/anime/AnimeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [results, setResults] = useState<PageResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchAnime({ query, page })
        .then(data => {
          setResults(data);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
        setResults(null);
        setLoading(false);
    }
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/search?${params.toString()}`);
  }

  if (loading) {
    return <GridSkeleton />;
  }
      
  if (results && results.media.length > 0) {
    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.media.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mt-8">
            <Button
                onClick={() => handlePageChange(results.pageInfo.currentPage - 1)}
                disabled={!results.pageInfo.hasNextPage || results.pageInfo.currentPage === 1}
            >
                <ChevronLeft /> Previous
            </Button>
            <span>Page {results.pageInfo.currentPage} of {results.pageInfo.lastPage}</span>
            <Button
                onClick={() => handlePageChange(results.pageInfo.currentPage + 1)}
                disabled={!results.pageInfo.hasNextPage}
            >
                Next <ChevronRight />
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-16">
      <p className="text-muted-foreground text-lg">
        {query ? 'No results found.' : 'Start by typing in the search bar above.'}
      </p>
    </div>
  );
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    return (
        <div className="space-y-8">
            <h1 className="font-headline text-3xl font-bold">
                {query ? `Search Results for "${query}"` : 'Search for an Anime'}
            </h1>
            <Suspense fallback={<GridSkeleton />}>
                <SearchResults />
            </Suspense>
        </div>
    )
}
