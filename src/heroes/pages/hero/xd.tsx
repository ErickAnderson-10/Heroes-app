import { getHeroAction } from "@/heroes/action/get-hero";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const HeroPage = () => {
  const { idSlug = "" } = useParams(); //Para resivir el argumento/parametro de la url
  console.log(idSlug);
  const {} = useQuery({
    queryKey: ["Hero-information", { idSlug }],
    queryFn: () => getHeroAction(idSlug),
    staleTime: 1000 * 60 * 5,
  });
  return <></>;
};
