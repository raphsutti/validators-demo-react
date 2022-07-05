import { useState } from "react";
import { useQuery } from "react-query";
import { Record, Number, String } from "runtypes";

// Define one schema
const pokemonValidator = Record({
  id: Number,
  name: String,
  height: Number.withConstraint((n) => n > 0 || `${n} is not positive`),
  weight: Number.withConstraint((n) => n > 0 || `${n} is not positive`),
  sprites: Record({
    front_default: String,
  }),
  // doesntExist: Number,
});

// TypeScript type
// type PokemonResponse = Static<typeof pokemonValidator>;

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  return pokemonValidator.check(res);
};

export const RunTypesComponent = () => {
  const [runTypesId, setRunTypesId] = useState("");
  const { data } = useQuery(["pokemon", runTypesId], () =>
    runTypesId ? fetchPokemon(runTypesId) : null
  );

  return (
    <div>
      <h1>RunTypes</h1>
      <form>
        <label htmlFor="pokemonId">Pokemon number: </label>
        <input
          onChange={(e) => setRunTypesId(e.target.value)}
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
