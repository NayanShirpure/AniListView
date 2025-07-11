import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentSeason() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let season: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';

  if (month >= 0 && month <= 2) { // Jan, Feb, Mar
    season = 'WINTER';
  } else if (month >= 3 && month <= 5) { // Apr, May, Jun
    season = 'SPRING';
  } else if (month >= 6 && month <= 8) { // Jul, Aug, Sep
    season = 'SUMMER';
  } else { // Oct, Nov, Dec
    season = 'FALL';
  }

  return { season, year };
}

export function getNextSeason() {
    const { season, year } = getCurrentSeason();
    switch (season) {
        case 'WINTER': return { season: 'SPRING', year };
        case 'SPRING': return { season: 'SUMMER', year };
        case 'SUMMER': return { season: 'FALL', year };
        case 'FALL': return { season: 'WINTER', year: year + 1 };
    }
}
