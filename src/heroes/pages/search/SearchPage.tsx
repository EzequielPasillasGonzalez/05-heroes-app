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

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filters and Search Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
