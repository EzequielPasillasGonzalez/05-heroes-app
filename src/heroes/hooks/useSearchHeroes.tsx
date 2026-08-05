import {
  searchHeroesAction,
  type SearchOptions,
} from "@/heroes/actions/search-heroes.action";
import { useQuery } from "@tanstack/react-query";

export const useSearchHeroes = ({
  category,
  name,
  status,
  strength,
  team,
  universe,
}: SearchOptions) => {
  return useQuery({
    queryKey: [
      "search-heroes",
      { category, name, status, strength, team, universe },
    ],
    queryFn: () =>
      searchHeroesAction({ category, name, status, strength, team, universe }),
    staleTime: 1000 * 60 * 5,
  });
};
