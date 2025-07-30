
'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import { useFilters } from "@/hooks/use-filters";
import { useEffect, useState } from "react";
import { getGenresAndTags } from "@/lib/anilist";
import { ANIME_FORMATS, ANIME_SEASONS, ANIME_STATUSES, ANIME_SORTS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

function FilterSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    )
}

export function FilterSidebar() {
    const { filters, setFilter } = useFilters();
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGenresAndTags().then(({ genres }) => {
            setGenres(genres);
            setLoading(false);
        });
    }, []);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);

    const handleGenreChange = (genre: string, checked: boolean) => {
        const currentGenres = filters.genres || [];
        const newGenres = checked
            ? [...currentGenres, genre]
            : currentGenres.filter((g) => g !== genre);
        setFilter('genres', newGenres.length > 0 ? newGenres : undefined);
    };

    if (loading) return <FilterSkeleton />;

    return (
        <Card className="p-4 space-y-4 sticky top-20">
            <h2 className="font-headline text-lg font-bold">Filters</h2>

            <div className="space-y-2">
                <Label htmlFor="sort-by">Sort By</Label>
                <Select
                    value={filters.sort}
                    onValueChange={(value) => setFilter('sort', value)}
                >
                    <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Popularity" />
                    </SelectTrigger>
                    <SelectContent>
                        {ANIME_SORTS.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Accordion type="multiple" className="w-full" defaultValue={['genres']}>
                <AccordionItem value="genres">
                    <AccordionTrigger>Genres</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {genres.map(genre => (
                                <div key={genre} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`genre-${genre}`}
                                        checked={filters.genres?.includes(genre)}
                                        onCheckedChange={(checked) => handleGenreChange(genre, !!checked)}
                                    />
                                    <Label htmlFor={`genre-${genre}`} className="font-normal text-sm">{genre}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="year">
                    <AccordionTrigger>Year</AccordionTrigger>
                    <AccordionContent>
                        <Select onValueChange={(value) => setFilter('seasonYear', value === 'any' ? undefined : parseInt(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Year</SelectItem>
                                {years.map(year => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>

                 <AccordionItem value="season">
                    <AccordionTrigger>Season</AccordionTrigger>
                    <AccordionContent>
                        <Select onValueChange={(value) => setFilter('season', value === 'any' ? undefined : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any Season" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Season</SelectItem>
                                {ANIME_SEASONS.map(season => (
                                     <SelectItem key={season} value={season}>{season}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="format">
                    <AccordionTrigger>Format</AccordionTrigger>
                    <AccordionContent>
                         <Select onValueChange={(value) => setFilter('format', value === 'any' ? undefined : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Format</SelectItem>
                                {ANIME_FORMATS.map(format => (
                                     <SelectItem key={format} value={format}>{format.replace(/_/g, " ")}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="status">
                    <AccordionTrigger>Airing Status</AccordionTrigger>
                    <AccordionContent>
                         <Select onValueChange={(value) => setFilter('status', value === 'any' ? undefined : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Status</SelectItem>
                                {ANIME_STATUSES.map(status => (
                                     <SelectItem key={status} value={status}>{status.replace(/_/g, " ")}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
