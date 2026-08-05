import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron.tsx";
import { HeroStats } from "@/heroes/components/HeroStats.tsx";
import { HeroGrid } from "@/heroes/components/HeroGrid";
// import { useEffect, useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";

import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { useHeroPaginated } from "@/heroes/hooks/useHeroPaginated";
import { useQueryParameters } from "@/heroes/hooks/useQueryParameters";
import { use } from "react";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

const HomePage = () => {
  const { getParam, setParam } = useQueryParameters();
  const { favorites, favoritesCount } = use(FavoriteHeroContext);

  const limit = getParam("limit", 6);
  const page = getParam("page", 1);
  const activeTab = getParam("tab", "all");

  const { data: heroesResponse } = useHeroPaginated({
    limit: limit,
    page: page,
    category: activeTab,
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
            onClick={() => setParam({ tab: "all", category: "all", page: 1 })}
          >
            All Characters ({summary?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setParam({ tab: "favorites", page: 1 })}
          >
            Favorites ({favoritesCount})
          </TabsTrigger>
          <TabsTrigger
            value="hero"
            onClick={() => setParam({ tab: "hero", category: "hero", page: 1 })}
          >
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villain"
            onClick={() =>
              setParam({
                tab: "villain",
                category: "villain",
                page: "1",
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
          <HeroGrid heroes={favorites ?? []} />
        </TabsContent>

        {/* Mostrar todos los heroes*/}
        <TabsContent value="hero">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        {/* Mostrar todos los villanos*/}
        <TabsContent value="villain">
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {activeTab !== "favorites" && (
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      )}
    </>
  );
};

export default HomePage;
