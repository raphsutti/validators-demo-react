import { z } from "zod";
import { useState } from "react";
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

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  return pokemonValidator.parse(res);
};

export const ZodComponent = () => {
  const [id, setId] = useState("");
  const { data } = useQuery(["pokemon", id], () => fetchPokemon(id));

  return (
    <div>
      <form>
        <input onChange={(e) => setId(e.target.value)} type="text" />
      </form>
      {!data ? null : <div>{data.name}</div>}
    </div>
  );
};
