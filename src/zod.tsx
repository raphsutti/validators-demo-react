import { z } from "zod";
import { useState } from "react";
import { useQuery } from "react-query";

// Define one schema
const pokemonValidator = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().min(0),
  weight: z.number().min(0),
  sprites: z.object({
    front_default: z.string().url(),
  }),
});

// TypeScript type
// type PokemonResponse = z.infer<typeof pokemonValidator>

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  return pokemonValidator.parse(res);
};

export const ZodComponent = () => {
  const [zodId, setZodId] = useState("");
  const { data } = useQuery(["pokemon", zodId], () =>
    zodId ? fetchPokemon(zodId) : null
  );

  return (
    <div>
      <h1>Zod</h1>
      <form>
        <label htmlFor="pokemonId">Pokemon number: </label>
        <input
          onChange={(e) => setZodId(e.target.value)}
          type="text"
          name="pokemonId"
        />
      </form>

      {data ? (
        <>
          <img src={data.sprites.front_default} alt="pokemon sprite" />
          <div>Name: {data.name}</div>
          <div>Weight: {data.weight}</div>
          <div>Height: {data.height}</div>
        </>
      ) : null}
    </div>
  );
};
