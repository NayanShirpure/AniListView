
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useCallback } from 'react';

interface FilterState {
    q?: string;
    page?: number;
    sort?: string;
    genres?: string[];
    format?: string;
    season?: string;
    seasonYear?: number;
    status?: string;
}

interface FilterContextType {
    filters: FilterState;
    setFilter: (key: keyof FilterState, value: any) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

function parseFiltersFromParams(params: URLSearchParams): FilterState {
    const filters: FilterState = {};
    const q = params.get('q');
    if (q) filters.q = q;

    const page = params.get('page');
    if (page) filters.page = parseInt(page, 10);

    const sort = params.get('sort');
    if (sort) filters.sort = sort;

    const genres = params.get('genres');
    if (genres) filters.genres = genres.split(',');

    const format = params.get('format');
    if (format) filters.format = format;

    const season = params.get('season');
    if (season) filters.season = season;

    const seasonYear = params.get('seasonYear');
    if (seasonYear) filters.seasonYear = parseInt(seasonYear, 10);
    
    const status = params.get('status');
    if (status) filters.status = status;

    return filters;
}


export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters = parseFiltersFromParams(searchParams);

    const setFilter = useCallback((key: keyof FilterState, value: any) => {
        const params = new URLSearchParams(searchParams);
        if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
            params.delete(key);
        } else {
            params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
        }

        // Reset page to 1 when filters change, but not when page itself changes
        if(key !== 'page') {
            params.set('page', '1');
        }

        router.push(`${pathname}?${params.toString()}`);
    }, [searchParams, router, pathname]);
    
    return (
        <FilterContext.Provider value={{ filters, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};
