import { getHeroByPageAction } from "../action/get-heroes-by-page.action";
import { useQuery } from "@tanstack/react-query";

export const usePaginatedHero = (
  page: number,
  limit: number,
  category = "villain",
) => {
  return useQuery({
    //La data es el producto exitoso de la peticion getHero..
    // queryKey: ["Heroes",'limit',limit,'page',page], Cuando los argumentos no son posicionales(Pueden cambiar de posicion y cambiar totalmente el arreglo) se aconseja crear un objeto, para que ahora se guíe del nombre y no de la posicion
    queryKey: ["Heroes", { page: page, limit: limit, category: category }], //Podemos simplificar esto
    //queryKey: ["Heroes", { page, limit }],
    //!Cuando nuestra funcion que esté dentro de tanstackquery recibe argumentos, esos argumentos tienen que se parte del query key
    queryFn: () => getHeroByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutos - Cuanto tiempo va a considerar el resultado de esta peticion como fresca y si en otro lugar de mi aplicacion se vuelve a llamar el mismo key, va a regresar la informacion del caché y no vamos a volver a analizar la peticion http
  });
};
