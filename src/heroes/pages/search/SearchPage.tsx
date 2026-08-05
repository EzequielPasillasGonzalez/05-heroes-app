import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { useQueryParameters } from "@/heroes/hooks/useQueryParameters";
import { useSearchHeroes } from "@/heroes/hooks/useSearchHeroes";
import { SearchControls } from "@/heroes/pages/search/ui/SearchControls";

const SearchPage = () => {
  const { getParam } = useQueryParameters();

  const name = getParam("name");

  const { data: searchedHeroes } = useSearchHeroes({ name });

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y Administra SuperHéroes"
      />

      <CustomBreadcrumb currentPage="Search SuperHeroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filters and Search Controls */}
      <SearchControls />

      <HeroGrid heroes={searchedHeroes ?? []} />
    </>
  );
};

export default SearchPage;
