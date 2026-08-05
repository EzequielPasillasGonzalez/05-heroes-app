import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const VALID_TABS = ["all", "favorites", "hero", "villain"] as const;

// Extraemos el tipo de TypeScript a partir del array (evita duplicar código)
export type TabType = (typeof VALID_TABS)[number];

export interface QueryParamsMap {
  tab: TabType;
  page: number;
  limit: number;
  activeAccordion: string;
  category: TabType;
  name: string;
  team: string;
  universe: string;
  status: string;
  strength: string;
}

export type QueryParamKey = keyof QueryParamsMap;

// Tipamos las opciones múltiples como un objeto parcial
type QueryParamsObj = Partial<QueryParamsMap>;

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

  // Firma 1: Permite pasar un solo key-value
  function setParam<K extends QueryParamKey>(
    key: K,
    value: QueryParamsMap[K] | null | undefined,
  ): void;
  // Firma 2: Permite pasar un objeto con múltiples parámetros
  function setParam(paramsObj: QueryParamsObj): void;

  function setParam<K extends QueryParamKey>(
    keyOrObj: K | QueryParamsObj,
    value?: QueryParamsMap[K] | null | undefined,
  ) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      // Si pasaron un objeto { page: 1, tab: "heroes" }
      if (typeof keyOrObj === "object" && keyOrObj !== null) {
        Object.entries(keyOrObj).forEach(([k, v]) => {
          if (v === undefined || v === null || v === "") {
            params.delete(k);
          } else {
            params.set(k, String(v));
          }
        });
      } else if (typeof keyOrObj === "string") {
        // Si pasaron clave y valor individuales ("page", 1)
        if (value === undefined || value === null || value === "") {
          params.delete(keyOrObj);
        } else {
          params.set(keyOrObj, String(value));
        }
      }

      return params;
    });
  }

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
      activeAccordion: "",
      page: 1,
      limit: 6,
      name: "",
      team: "",
      universe: "",
      status: "",
      strength: "",
    };
    return defaults[key];
  };

  return {
    activeTab,
    setParam,
    getParam,
  };
};
