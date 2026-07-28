import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "../../../components/custom/CustomJumbotron.tsx";
import { HeroStats } from "../../components/HeroStats.tsx";
import { SearchControls } from "./ui/SearchControls.tsx";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y Administra SuperHéroes"
      />

      <CustomBreadcrumb
        currentPage="Search SuperHeroes"
        breadcrumbs={[
          { label: "Home1", to: "/" },
          { label: "Home2", to: "/" },
          { label: "Home3", to: "/" },
        ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filters and Search Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
