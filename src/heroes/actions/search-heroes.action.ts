import { heroesApi } from "@/heroes/api/hero.api";
import type { SearchHeroesResponse } from "@/heroes/interfaces/search-heroes.interface";

export interface SearchOptions {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}
const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (
  options: SearchOptions,
): Promise<SearchHeroesResponse[]> => {
  // Filtrar parámetros undefined o vacíos para enviar una query limpia
  const cleanParams = Object.fromEntries(
    Object.entries(options).filter(
      ([_, value]) => value !== undefined && value !== "" && value !== "all",
    ),
  );

  const { data } = await heroesApi.get<SearchHeroesResponse[]>("/search", {
    params: cleanParams,
  });

  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
};
