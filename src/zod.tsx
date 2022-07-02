import { z } from "zod";
import React from "react";
import { useQuery } from "react-query";

const pokemonValidator = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().min(0),
  weight: z.number().min(0),
  sprites: z.object({
    front_default: z.string().url(),
  }),
});

const usePokemon = (id: string) => {
  return useQuery(["user-query"], async () => {
    const res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    ).json();
    return pokemonValidator.parse(res);
  });
};

export const ZodComponent: React.FC<{ id: string }> = ({ id }) => {
  const { data } = usePokemon(id);

  if (!data) return <div>Loading...</div>;
  return <div>{data.name}</div>;
};
