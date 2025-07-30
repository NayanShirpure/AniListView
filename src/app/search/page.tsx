import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SearchResults from '@/components/search/SearchResults';
import { FilterSidebar } from '@/components/search/FilterSidebar';
import { FilterProvider } from '@/hooks/use-filters';

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

export default function SearchPage() {
    return (
        <FilterProvider>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
                    <FilterSidebar />
                </div>
                <div className="flex-1 min-w-0">
                     <Suspense fallback={<GridSkeleton />}>
                        <SearchResults />
                    </Suspense>
                </div>
            </div>
        </FilterProvider>
    )
}
