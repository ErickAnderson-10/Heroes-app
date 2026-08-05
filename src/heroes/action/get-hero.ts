import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (idSlug: string) => {
  const { data } = await heroApi.get<Hero>(`/${idSlug}`); //Si la data no está entre llaves, no se podría hacer el data.image
  //Axios no te devuelve el objeto literalmente como está en el JSON de POSTMAN,Te devuelve un objeto de tipo AxiosResponse. Aproximadamente esto es lo que te devuelve

  //   const response = {
  //   data: {
  //     id: "2",
  //     name: "Bruce Wayne",
  //     slug: "bruce-wayne",
  //     alias: "Batman",
  //     image: "2.jpeg",
  //     universe: "DC"
  //   },
  //   status: 200,
  //   statusText: "OK",
  //   headers: { ... },
  //   config: { ... }
  // };

  return {
    ...data,
    image: `${BASE_URL}/images/${data.image}`,
  };
};
