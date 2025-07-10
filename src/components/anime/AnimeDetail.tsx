"use client";

import type { Anime } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Tv, Calendar, Users, Clapperboard, Film, PlayCircle, Heart } from 'lucide-react';
import { MotionDiv } from '@/components/MotionDiv';
import AnimeCard from './AnimeCard';

interface AnimeDetailProps {
  anime: Anime;
}

export default function AnimeDetail({ anime }: AnimeDetailProps) {
  const title = anime.title.english || anime.title.romaji;

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative h-48 md:h-64 lg:h-80 w-full">
        {anime.bannerImage && (
          <Image
            src={anime.bannerImage}
            alt={`${title} banner`}
            fill
            className="object-cover rounded-lg"
            priority
            data-ai-hint="anime landscape"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 md:-mt-24">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          <MotionDiv 
            className="w-48 md:w-1/3 lg:w-1/4 flex-shrink-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src={anime.coverImage.extraLarge || 'https://placehold.co/300x450.png'}
              alt={title}
              width={300}
              height={450}
              className="rounded-lg shadow-xl object-cover w-full h-auto"
              data-ai-hint="anime manga"
            />
          </MotionDiv>
          <MotionDiv 
            className="w-full md:w-2/3 lg:w-3/4 pb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
            <p className="text-lg text-muted-foreground">{anime.title.romaji}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {anime.genres.slice(0, 5).map((genre) => (
                <Badge key={genre} variant="secondary">{genre}</Badge>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {anime.trailer?.site === 'youtube' && (
              <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href={`https://www.youtube.com/watch?v=${anime.trailer.id}`} target="_blank" rel="noopener noreferrer">
                    <PlayCircle className="mr-2" /> Watch Trailer
                  </Link>
              </Button>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Synopsis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: anime.description?.replace(/\n/g, '<br />') || 'No description available.' }} />
                </CardContent>
            </Card>

            {anime.characters?.edges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Characters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {anime.characters.edges.filter(c => c.role === 'MAIN').map(({ node: char }) => (
                    <div key={char.id} className="text-center">
                      <Image
                        src={char.image.large}
                        alt={char.name.full}
                        width={100}
                        height={150}
                        className="rounded-lg mx-auto object-cover aspect-[2/3]"
                        data-ai-hint="anime character"
                      />
                      <p className="text-sm mt-2 font-medium">{char.name.full}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {anime.recommendations?.nodes.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {anime.recommendations.nodes
                              .filter(rec => rec.mediaRecommendation)
                              .map(({ mediaRecommendation }) => (
                                <AnimeCard key={mediaRecommendation.id} anime={mediaRecommendation} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

          </div>

          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Star className="text-yellow-400" /> Score</span>
                  <span className="text-muted-foreground">{anime.averageScore ? `${anime.averageScore} / 100` : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Heart className="text-red-500" /> Popularity</span>
                  <span className="text-muted-foreground">#{anime.popularity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Clapperboard /> Format</span>
                  <span className="text-muted-foreground">{anime.format?.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Film /> Episodes</span>
                  <span className="text-muted-foreground">{anime.episodes || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Tv /> Status</span>
                  <span className="text-muted-foreground">{anime.status?.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Calendar /> Aired</span>
                  <span className="text-muted-foreground">{anime.startDate?.year}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><Users /> Studios</span>
                  <span className="text-muted-foreground text-right">{anime.studios?.nodes.map(s => s.name).join(', ')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
