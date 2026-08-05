import { heroesApi } from "@/heroes/api/hero.api";
import { VALID_TABS, type TabType } from "@/heroes/hooks/useQueryParameters";
import type { HeroesResponse } from "@/heroes/interfaces/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: TabType = "all",
): Promise<HeroesResponse> => {
  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 6;

  const isCategoryValid = (VALID_TABS as readonly string[]).includes(category);
  const validCategory: TabType = isCategoryValid ? category : "all";

  const { data } = await heroesApi.get<HeroesResponse>("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
      category: validCategory,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes,
  };
};
