import { heroesApi } from "@/heroes/api/hero.api";
import type { HeroesResponse } from "@/heroes/interfaces/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (): Promise<HeroesResponse> => {
  const { data } = await heroesApi.get<HeroesResponse>("/");

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes,
  };
};
