import { useMemo } from "react";
import { useSearchParams } from "react-router";

const VALID_TABS = ["all", "favorites", "heroes", "villains"] as const;

// Extraemos el tipo de TypeScript a partir del array (evita duplicar código)
type TabType = (typeof VALID_TABS)[number];

export const useQueryParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawTab: TabType = (searchParams.get("tab") as TabType) ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";

  //  Validamos si el tab actual es uno de los permitidos
  const activeTab: TabType = useMemo(() => {
    // Si el tab de la URL existe y está dentro de nuestro array permitido, lo usamos
    if (rawTab && (VALID_TABS as readonly string[]).includes(rawTab)) {
      return rawTab as TabType;
    }
    // Si meten un tab inválido en la URL (ej. ?tab=hola), caemos al default "all"
    return "all";
  }, [rawTab]);
  return {
    page,
    limit,
    activeTab,
    setSearchParams,
  };
};
