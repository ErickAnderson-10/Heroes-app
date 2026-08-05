import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../action/get-summary.action";

//Estamos retornando todo el objeto, en lugar de solo retornar la data, te regresa todo el objeto(con todas las propiedades)
export const useHeroSummary = () => {
  return useQuery({
    queryKey: ["Summary-information"],
    queryFn: getSummaryAction, //() => getSummaryAction(). Es lo mismo
    staleTime: 1000 * 60 * 5,
  });
};
