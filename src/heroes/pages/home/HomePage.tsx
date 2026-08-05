import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { use, useMemo } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

import { useSearchParams } from "react-router";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  //El problema del useState es que no hay una manera de preservar el estado si nosotros recargamos el navegador o cambiamos el url a otra página. Podría resolverse con el local storage pero esto solo serviría cuando recarguemos el navegador web mas no cuando cambimos la url. Por eso aplicamos los query parameters

  const [searchParams, setSearchParams] = useSearchParams(); //Setserachparams nos va a servir para establecer queryparams en la url

  // const [activeTab, setActiveTab] = useState<
  //   "all" | "favorites" | "heroes" | "villains"
  // >("all");

  const { favorities, favoriteCount } = use(FavoriteHeroContext);

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "aa";

  //Validacion para que el active tab manoseado no rompa la aplicacion
  const selectedTab = useMemo(() => {
    //Use Memo sirve para no ejecutar otra vez la funcion si el arreglo de dependencias no cambia
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);
  //!Toda la lógica que está arriba se puede hacer en un Hook, hacerlo después.
  //Es muy tradicionar hacer un useEffect para hacer la primera peticion http. Pero el problema es que cada vez que nosotrs regresemos a la pantalla de inicio, se va a volver a ejecutar la peticion http, por eso no se aconseja
  // useEffect(() => {
  //   getHeroByPage().then((heroes) => {
  //     console.log({ heroes });
  //   });
  // }, []);

  //La data es HeroResponse o Undefined xq cuando el componente se monta por primera vez todavía no tengo los datos en la data(entonces es undefined). Cuando llega la data, useQuery nos avisa y se vuelve a renderizar el componente. Solo ahi

  const { data: heroResponse } = usePaginatedHero(+page, +limit, category);

  // const { data: Summary } = useQuery({
  //   queryKey: ["Summary-information"],
  //   queryFn: getSummaryAction, //() => getSummaryAction(). Es lo mismo
  //   staleTime: 1000 * 60 * 5,
  // });
  const { data: Summary } = useHeroSummary(); //un Hook creado por nosotros para no repetir código. Se hace cuando haz repetido el mismo código 2 o más veces

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="SuperHero Universe"
          description="Descubre, explora y administra super héroes"
        />

        <CustomBreadcrumbs
          currentPage="Heroes"
          breadcrumbs={[
            { label: "home", to: "/" },
            { label: "home1", to: "/" },
            { label: "home2", to: "/" },
          ]}
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          {/*value: Para saber en que tab  . Los otros value son solo identificadores*/}
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              All Characters ({Summary?.totalHeroes ?? 1})
            </TabsTrigger>
            {/*Esta nueva funcion de onclick sirve para que al momento de yo agregarle más valores a la url por medio del &, Este no cambie aunque cambie el tab EJ: http://localhost:5173/?tab=all&page=10 - cambio - http://localhost:5173/?tab=favorites&page=10 */}
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
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Heroes ({Summary?.heroCount ?? 1})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Villains ({Summary?.villainCount})
            </TabsTrigger>
          </TabsList>
          {/*Para que esto funcione tiene que ser mediante states*/}
          <TabsContent value={"all"}>
            <h1>Todos los personajes</h1>
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value={"favorites"}>
            <h1>Favoritos</h1>
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes={favorities} />
          </TabsContent>
          <TabsContent value={"heroes"}>
            <h1>Todos los heroes</h1>
            {/* Mostrar todos los heroes */}
            <HeroGrid heroes={heroResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value={"villains"}>
            <h1>Todos los villanos</h1>
            {/* Mostrar todos los villanos */}
            <HeroGrid heroes={heroResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div>

        {/* Character Grid */}
        {/* <HeroGrid heroes={heroResponse?.heroes ?? []} /> */}

        {/* Pagination */}
        {selectedTab !== "favorites" && (
          <CustomPagination totalPages={heroResponse?.pages ?? 1} />
        )}
      </>
    </>
  );
};
