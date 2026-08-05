import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "@/heroes/pages/search/ui/SearchControls";

const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
