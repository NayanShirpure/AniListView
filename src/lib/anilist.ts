import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import type { PageResult, Anime, AiringScheduleItem } from './types';
import { GET_TRENDING_ANIME, GET_SEASONAL_ANIME, GET_ANIME_DETAILS, SEARCH_ANIME, GET_AIRING_SCHEDULE } from './queries';
import { getCurrentSeason, getNextSeason } from './utils';

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://graphql.anilist.co" }),
  cache: new InMemoryCache(),
});

export async function getTrendingAnime(): Promise<Anime[]> {
  try {
    const { data } = await client.query({
      query: GET_TRENDING_ANIME,
      variables: { page: 1, perPage: 15 },
    });
    return data.Page.media;
  } catch (error) {
    console.error("Failed to fetch trending anime:", error);
    return [];
  }
}

export async function getSeasonalAnime(): Promise<Anime[]> {
  try {
    const { season, year } = getCurrentSeason();
    const { data } = await client.query({
      query: GET_SEASONAL_ANIME,
      variables: { page: 1, perPage: 20, season: season.toUpperCase(), seasonYear: year },
    });
    return data.Page.media;
  } catch (error) {
    console.error("Failed to fetch seasonal anime:", error);
    return [];
  }
}

export async function getTopRatedAnime(): Promise<Anime[]> {
    try {
        const { data } = await client.query({
            query: SEARCH_ANIME,
            variables: { page: 1, perPage: 10, sort: ['SCORE_DESC'] },
        });
        return data.Page.media;
    } catch (error) {
        console.error("Failed to fetch top rated anime:", error);
        return [];
    }
}

export async function getUpcomingAnime(): Promise<Anime[]> {
    try {
        const { season, year } = getNextSeason();
        const { data } = await client.query({
            query: SEARCH_ANIME,
            variables: { 
                page: 1, 
                perPage: 15, 
                season: season.toUpperCase(), 
                seasonYear: year,
                status: 'NOT_YET_RELEASED',
                sort: ['POPULARITY_DESC']
            },
        });
        return data.Page.media;
    } catch (error) {
        console.error("Failed to fetch upcoming anime:", error);
        return [];
    }
}


export async function getAnimeDetails(id: number): Promise<Anime | null> {
  try {
    const { data } = await client.query({
      query: GET_ANIME_DETAILS,
      variables: { id },
    });
    return data.Media;
  } catch (error) {
    console.error(`Failed to fetch details for anime ID ${id}:`, error);
    return null;
  }
}

export async function searchAnime(options: {
  query?: string;
  page?: number;
  perPage?: number;
  sort?: string[];
  format?: string[];
  season?: string;
  seasonYear?: number;
  status?: string;
}): Promise<PageResult> {
  const { query, page = 1, perPage = 20, sort = ['POPULARITY_DESC'], format, season, seasonYear, status } = options;
  try {
    const { data } = await client.query({
      query: SEARCH_ANIME,
      variables: { search: query, page, perPage, sort, format_in: format, season, seasonYear, status },
    });
    return data.Page;
  } catch (error) {
    console.error("Failed to search anime:", error);
    return { pageInfo: { hasNextPage: false, total: 0, currentPage: 1, lastPage: 1, perPage: 20 }, media: [] };
  }
}

export async function getAiringSchedule(start: number, end: number): Promise<AiringScheduleItem[]> {
  try {
    const { data } = await client.query({
      query: GET_AIRING_SCHEDULE,
      variables: { start, end },
    });
    return data.Page.airingSchedules;
  } catch (error) {
    console.error("Failed to fetch airing schedule:", error);
    return [];
  }
}
