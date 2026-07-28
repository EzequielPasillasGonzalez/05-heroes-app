import { heroesApi } from "@/heroes/api/hero.api";

export const getHeroesByPage = async () => {
  const { data } = await heroesApi.get("/");

  return data;
};
