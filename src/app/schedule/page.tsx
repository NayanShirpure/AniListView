import { getAiringSchedule } from '@/lib/anilist';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import type { AiringScheduleItem } from '@/lib/types';
import { format } from 'date-fns';

function ScheduleSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-6 w-1/2 rounded-md" />
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             {[...Array(3)].map((_, j) => (
                 <div key={j} className="flex items-center gap-4">
                    <Skeleton className="w-16 h-24 rounded-md" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
             ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function ScheduleData() {
  const now = new Date();
  const startOfWeek = Math.floor(now.getTime() / 1000);
  const endOfWeek = startOfWeek + 7 * 24 * 60 * 60; // 7 days from now

  const scheduleData = await getAiringSchedule(startOfWeek, endOfWeek);

  const groupedByDay = scheduleData.reduce((acc, item) => {
    const date = format(new Date(item.airingAt * 1000), 'EEEE, MMMM d');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, AiringScheduleItem[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {Object.entries(groupedByDay).map(([day, items]) => (
            <Card key={day}>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {items.map((item) => (
                        <Link href={`/anime/${item.media.id}`} key={item.id} className="flex items-start gap-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                            <div className="w-16 h-24 relative flex-shrink-0">
                                <Image
                                    src={item.media.coverImage.large || 'https://placehold.co/64x96/22132D/F2EFFF.png'}
                                    alt={item.media.title.english || item.media.title.romaji || 'Anime cover'}
                                    fill
                                    className="rounded-md object-cover"
                                    sizes="64px"
                                    data-ai-hint="anime manga"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold group-hover:text-primary transition-colors">{item.media.title.english || item.media.title.romaji}</p>
                                <p className="text-sm text-muted-foreground">Episode {item.episode}</p>
                                <p className="text-sm text-muted-foreground">{format(new Date(item.airingAt * 1000), 'p')}</p>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        ))}
    </div>
  );
}

export default function SchedulePage() {
    return (
      <div className="space-y-8">
        <h1 className="font-headline text-3xl font-bold">Airing Schedule (Next 7 Days)</h1>
        <Suspense fallback={<ScheduleSkeleton />}>
          <ScheduleData />
        </Suspense>
      </div>
    );
}
