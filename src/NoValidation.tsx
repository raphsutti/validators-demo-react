import { useState } from "react";
import { useQuery } from "react-query";

interface PokemonResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  doesntExist: number;
}

const fetchPokemon = async (id: string) => {
  return (await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json()) as PokemonResponse;
};

export const NoValidationComponent = () => {
  const [noValidationId, setNoValidationId] = useState("");
  const { data } = useQuery(["pokemon", noValidationId], () =>
    noValidationId ? fetchPokemon(noValidationId) : null
  );

  return (
    <div>
      <h1>No Validation</h1>
      <form>
        <label htmlFor="pokemonId">Pokemon number: </label>
        <input
          onChange={(e) => setNoValidationId(e.target.value)}
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
          <div>Doesnt Exist: {typeof data.doesntExist}</div>
        </>
      ) : null}
    </div>
  );
};
