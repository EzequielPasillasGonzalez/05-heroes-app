import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import type { TabType } from "@/heroes/hooks/useQueryParameters";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  limit: number;
  category: TabType;
}

export const useHeroPaginated = ({
  limit = 6,
  page = 1,
  category = "all",
}: Props) => {
  return useQuery({
    // Identificador único en caché y objeto de dependencias que reactivan la petición si cambian
    queryKey: ["heroes", { page, limit, category }],

    // Función asíncrona que obtiene los datos (debe retornar una promesa)
    queryFn: () => getHeroesByPageAction(+page, +limit, category),

    // Tiempo (5 min) durante el cual la data se considera "fresca"; mientras sea fresca, TanStack no re-hace la petición al volver al componente
    staleTime: 1000 * 60 * 5,
  });
};
