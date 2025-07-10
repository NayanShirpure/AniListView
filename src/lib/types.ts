export interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  };
  bannerImage: string;
  description: string;
  episodes: number;
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS';
  season: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  seasonYear: number;
  averageScore: number;
  genres: string[];
  studios: {
    nodes: {
      name: string;
    }[];
  };
  trailer: {
    id: string;
    site: string;
  };
  characters: {
    edges: {
      role: string;
      voiceActors: {
        id: number;
        name: {
          full: string;
        }
      }[];
      node: {
        id: number;
        name: {
          full: string;
        };
        image: {
          large: string;
        };
      };
    }[];
  };
  staff: {
    edges: {
      role: string;
      node: {
        id: number;
        name: {
          full: string;
        };
        image: {
          large: string;
        };
      };
    }[];
  };
  relations: {
    edges: {
      relationType: string;
      node: Anime;
    }[];
  };
  externalLinks: {
    id: number;
    url: string;
    site: string;
    icon: string;
  }[];
  recommendations: {
    nodes: {
      mediaRecommendation: Anime;
    }[];
  };
  airingSchedule: {
    nodes: {
      airingAt: number;
      episode: number;
    }[];
  };
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
  };
  format: string;
  popularity: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface PageResult {
  pageInfo: PageInfo;
  media: Anime[];
}

export interface AiringScheduleItem {
  id: number;
  airingAt: number;
  episode: number;
  mediaId: number;
  media: Anime;
}
