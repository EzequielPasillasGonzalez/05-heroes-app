import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const VALID_TABS = ["all", "favorites", "hero", "villain"] as const;

// Extraemos el tipo de TypeScript a partir del array (evita duplicar código)
export type TabType = (typeof VALID_TABS)[number];

type ParamValue = string | number | undefined | null;
type QueryParamsObj = Record<string, ParamValue>;

export interface QueryParamsMap {
  tab: TabType;
  page: number;
  limit: number;
  name: string;
  category: TabType;
}

export type QueryParamKey = keyof QueryParamsMap;

export const useQueryParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawTab: TabType = (searchParams.get("tab") as TabType) ?? "all";

  //  Validamos si el tab actual es uno de los permitidos
  const activeTab: TabType = useMemo(() => {
    // Si el tab de la URL existe y está dentro de nuestro array permitido, lo usamos
    if (rawTab && (VALID_TABS as readonly string[]).includes(rawTab)) {
      return rawTab as TabType;
    }
    // Si meten un tab inválido en la URL (ej. ?tab=hola), caemos al default "all"
    return "all";
  }, [rawTab]);

  const setParam = (newParams: QueryParamsObj) => {
    setSearchParams((prev) => {
      // Creamos un nuevo URLSearchParams basado en el anterior
      const params = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key); // Si viene vacío, lo elimina de la URL
        } else {
          params.set(key, String(value)); // Inserta o actualiza el valor
        }
      });

      return params;
    });
  };

  //  Función genérica fuertemente tipada
  const getParam = <K extends QueryParamKey>(
    key: K,
    defaultValue?: QueryParamsMap[K],
  ): QueryParamsMap[K] => {
    const rawValue = searchParams.get(key);

    if (rawValue === null || rawValue === undefined) {
      return (defaultValue ?? _getDefaultValueForKey(key)) as QueryParamsMap[K];
    }

    // Conversión automática de tipos según la key pedida
    if (key === "page" || key === "limit") {
      const parsed = parseInt(rawValue, 10);
      return (
        isNaN(parsed) ? (defaultValue ?? 1) : parsed
      ) as QueryParamsMap[K];
    }

    if (key === "tab" || key === "category") {
      const isValid = (VALID_TABS as readonly string[]).includes(rawValue);
      return (
        isValid ? rawValue : (defaultValue ?? "all")
      ) as QueryParamsMap[K];
    }

    return rawValue as QueryParamsMap[K];
  };

  // Helper privado para fallbacks seguros por defecto
  const _getDefaultValueForKey = <K extends QueryParamKey>(
    key: K,
  ): QueryParamsMap[K] => {
    const defaults: QueryParamsMap = {
      tab: "all",
      category: "all",
      page: 1,
      limit: 6,
      name: "",
    };
    return defaults[key];
  };
  return {
    activeTab,
    setParam,
    getParam,
  };
};
