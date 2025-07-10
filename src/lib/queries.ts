import { gql } from "@apollo/client";

export const ANIME_CARD_FRAGMENT = gql`
  fragment AnimeCard on Media {
    id
    title {
      romaji
      english
    }
    coverImage {
      extraLarge
      color
    }
    averageScore
    format
    status
    season
    seasonYear
  }
`;

export const GET_TRENDING_ANIME = gql`
  ${ANIME_CARD_FRAGMENT}
  query GetTrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...AnimeCard
      }
    }
  }
`;

export const GET_SEASONAL_ANIME = gql`
  ${ANIME_CARD_FRAGMENT}
  query GetSeasonalAnime($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...AnimeCard
      }
    }
  }
`;

export const GET_ANIME_DETAILS = gql`
  ${ANIME_CARD_FRAGMENT}
  query GetAnimeDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeCard
      bannerImage
      description(asHtml: false)
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      trailer {
        id
        site
      }
      characters(role: MAIN, sort: [ROLE, RELEVANCE], perPage: 12) {
        edges {
          role
          voiceActors(language: JAPANESE, sort: RELEVANCE) {
            id
            name {
              full
            }
          }
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      staff(sort: [RELEVANCE, ROLE], perPage: 8) {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      relations {
        edges {
          relationType(version: 2)
          node {
            ...AnimeCard
          }
        }
      }
      externalLinks {
        id
        url
        site
        icon
      }
      recommendations(sort: RATING_DESC, perPage: 8) {
        nodes {
          mediaRecommendation {
            ...AnimeCard
          }
        }
      }
      episodes
      nextAiringEpisode {
        airingAt
        episode
      }
      startDate {
        year
        month
        day
      }
      popularity
    }
  }
`;

export const GET_AIRING_SCHEDULE = gql`
  query GetAiringSchedule($start: Int, $end: Int) {
    Page {
      airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
        id
        airingAt
        episode
        media {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
            color
          }
          nextAiringEpisode {
            timeUntilAiring
          }
        }
      }
    }
  }
`;

export const SEARCH_ANIME = gql`
  ${ANIME_CARD_FRAGMENT}
  query SearchAnime($page: Int, $perPage: Int, $search: String, $sort: [MediaSort], $format_in: [MediaFormat], $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: $search, sort: $sort, type: ANIME, format_in: $format_in, season: $season, seasonYear: $seasonYear, isAdult: false) {
        ...AnimeCard
      }
    }
  }
`;
