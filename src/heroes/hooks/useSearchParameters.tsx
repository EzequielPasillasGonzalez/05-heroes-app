import type { SearchOptions } from "@/heroes/actions/search-heroes.action";
import { useQueryParameters } from "@/heroes/hooks/useQueryParameters";
import { useMemo } from "react";
/**
 * Hook personalizado para extraer y estructurar los parámetros de búsqueda desde la URL.
 * Mantiene la referencia del objeto estable mediante memoización.
 */
export const useSearchParameters = () => {
  // Obtenemos el helper genérico para leer parámetros de la URL
  const { getParam } = useQueryParameters();

  // Memoizamos el objeto de opciones para evitar recalculaciones o re-renders innecesarios.
  // Si un parámetro está vacío o no existe, se asigna `undefined` para omitirlo en la petición HTTP.
  const searchOptions: SearchOptions = useMemo(
    () => ({
      name: getParam("name") || "",
      team: getParam("team") || "",
      universe: getParam("universe") || "",
      status: getParam("status") || "",
      strength: getParam("strength") || "",
    }),
    [getParam],
  );

  return { searchOptions };
};
