import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroByPageAction = async (
  page: number,
  limit: number = 6,
  category: string,
): Promise<HeroesResponse> => {
  if (isNaN(page)) {
    page = 1;
  }
  if (page <= 0 || page >= 25 / limit) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 6;
  }
  if (limit > 25) {
    limit = 6;
  }
  console.log(page);
  // heroApi.get("/") - > http://localhost:3000/api/heroes/
  // heroApi.get("/1") - > http://localhost:3000/api/heroes/1
  // "" o "/"  →  recurso principal (/api/heroes)
  //Aqui estás consumiento la api, estás obteniendo lo que tiene ese url
  //Get puede tener 2 parametros
  const { data } = await heroApi.get<HeroesResponse>("/", {
    //Estos son los parámetros que tengo que mandar (limit, page) xq son los que mi backend espera.
    params: {
      limit: limit,
      offset: (page - 1) * limit, //Así funciona el backend construido (page -- offset). Otros backend trabajan con page, offten es más pndj
      category: category,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes: heroes,
  };
};
