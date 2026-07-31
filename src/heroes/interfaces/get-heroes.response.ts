import type { Hero } from "@/heroes/interfaces/hero.interface";

export interface HeroesResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
