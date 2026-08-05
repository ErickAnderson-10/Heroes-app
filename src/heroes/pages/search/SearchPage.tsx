import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { useQuery } from "@tanstack/react-query";
import { getSearchHeroesAction } from "@/heroes/action/get-search-heroes.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? "";
  const strength = searchParams.get("strength") ?? "0";

  const { data: heroes = [] } = useQuery({
    queryKey: ["Search-Heroes", name, strength],
    queryFn: () => getSearchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <CustomJumbotron
        title="Busqueda de superhéroes"
        description="Descubre, explora y administra super héroes"
      />
      {/* Stats Dashbord */}
      <HeroStats />
      {/* Search and advanced Filter*/}
      <SearchControls />
      <HeroGrid heroes={heroes} />
    </>
  );
};

// Lo exporto por default ya que es lo que me pide la promesa en lazyload
export default SearchPage;
