import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron.tsx";
import { HeroStats } from "@/heroes/components/HeroStats.tsx";
import { HeroGrid } from "@/heroes/components/HeroGrid";
// import { useEffect, useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";

const VALID_TABS = ["all", "favorites", "heroes", "villains"] as const;

// Extraemos el tipo de TypeScript a partir del array (evita duplicar código)
type TabType = (typeof VALID_TABS)[number];

const HomePage = () => {
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

  const { data: heroesResponse } = useQuery({
    // Identificador único en caché y objeto de dependencias que reactivan la petición si cambian
    queryKey: ["heroes", { page, limit }],

    // Función asíncrona que obtiene los datos (debe retornar una promesa)
    queryFn: () => getHeroesByPageAction(+page, +limit),

    // Tiempo (5 min) durante el cual la data se considera "fresca"; mientras sea fresca, TanStack no re-hace la petición al volver al componente
    staleTime: 1000 * 60 * 5,
  });

  const { data: summary } = useHeroSummary();

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Universo de SuperHéroes"
        description="Descubre, explora y Administra SuperHéroes"
      />

      <CustomBreadcrumb currentPage="SuperHeroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={activeTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="all"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "all");
                return prev;
              })
            }
          >
            All Characters ({summary?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "favorites");
                return prev;
              })
            }
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "heroes");
                return prev;
              })
            }
          >
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "villains");
                return prev;
              })
            }
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        {/* Mostrar todos los personajes*/}
        <TabsContent value="all">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los favoritos*/}
        <TabsContent value="favorites">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los heroes*/}
        <TabsContent value="heroes">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los villanos*/}
        <TabsContent value="villains">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
    </>
  );
};

export default HomePage;
