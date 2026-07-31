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

const VALID_TABS = ["all", "favorites", "heroes", "villains"] as const;

// Extraemos el tipo de TypeScript a partir del array (evita duplicar código)
type TabType = (typeof VALID_TABS)[number];

const HomePage = () => {
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

  const { data: heroesReponse } = useQuery({
    queryKey: ["heroes"], // Donde se va a guardar
    queryFn: () => getHeroesByPageAction(), // Funcion que se ejecuta
    staleTime: 1000 * 60 * 5, // Por 5 minutos esta peticion se considera "fresca" y se guarda en cache
  });

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
            All Characters (16)
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
            Heroes (12)
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
            Villains (2)
          </TabsTrigger>
        </TabsList>

        {/* Mostrar todos los personajes*/}
        <TabsContent value="all">
          <h1>all</h1>
          {/* Character Grid */}

          <HeroGrid heroes={heroesReponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los favoritos*/}
        <TabsContent value="favorites">
          <h1>favorites</h1>
          {/* Character Grid */}
          <HeroGrid heroes={heroesReponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los heroes*/}
        <TabsContent value="heroes">
          <h1>heroes</h1>
          {/* Character Grid */}
          <HeroGrid heroes={heroesReponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los villanos*/}
        <TabsContent value="villains">
          <h1>villains</h1>
          {/* Character Grid */}
          <HeroGrid heroes={heroesReponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={8} />
    </>
  );
};

export default HomePage;
