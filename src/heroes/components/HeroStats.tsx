import { Badge } from "@/components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import { use } from "react";

export const HeroStats = () => {
  // const { data: Summary } = useQuery({
  //   queryKey: ["Summary-information"],
  //   queryFn: getSummaryAction, //() => getSummaryAction(). Es lo mismo
  //   staleTime: 1000 * 60 * 5,
  // });
  const { data: Summary } = useHeroSummary();

  const { favoriteCount } = use(FavoriteHeroContext);

  if (!Summary) {
    return <div>Loading...</div>;
  }
  const average = (favoriteCount / Summary.totalHeroes) * 100;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard
        title="Todos los heroes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{Summary?.totalHeroes ?? 1}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {Summary?.heroCount ?? 1} Héroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {Summary?.villainCount ?? 1} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard
        title="Favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">{average}% of total</p>
      </HeroStatCard>

      <HeroStatCard
        title="Strongest"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">
          {Summary?.strongestHero.alias ?? ""}
        </div>
        <p className="text-xs text-muted-foreground">
          {Summary?.strongestHero.strength ?? 1}
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Smartest"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">
          {Summary?.smartestHero.alias ?? ""}
        </div>
        <p className="text-xs text-muted-foreground">
          {Summary?.smartestHero.intelligence ?? ""}
        </p>
      </HeroStatCard>
    </div>
  );
};
