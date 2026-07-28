import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron.tsx";
import { HeroStats } from "@/heroes/components/HeroStats.tsx";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";

type tabType = "all" | "favorites" | "heroes" | "villains";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<tabType>("all");
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
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Characters (16)
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("favorites")}
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
            Heroes (12)
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab("villains")}
          >
            Villains (2)
          </TabsTrigger>
        </TabsList>

        {/* Mostrar todos los personajes*/}
        <TabsContent value="all">
          <h1>all</h1>
          {/* Character Grid */}
          <HeroGrid />
        </TabsContent>

        {/* Mostrar todos los favoritos*/}
        <TabsContent value="favorites">
          <h1>favorites</h1>
          {/* Character Grid */}
          <HeroGrid />
        </TabsContent>

        {/* Mostrar todos los heroes*/}
        <TabsContent value="heroes">
          <h1>heroes</h1>
          {/* Character Grid */}
          <HeroGrid />
        </TabsContent>

        {/* Mostrar todos los villanos*/}
        <TabsContent value="villains">
          <h1>villains</h1>
          {/* Character Grid */}
          <HeroGrid />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={8} />
    </>
  );
};

export default HomePage;
