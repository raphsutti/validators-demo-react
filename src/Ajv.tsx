import Ajv, { JSONSchemaType } from "ajv";
import { useState } from "react";
import { useQuery } from "react-query";

const ajv = new Ajv({ allErrors: true, verbose: true });

interface PokemonResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  // doesntExist: number;
}

const pokemonSchema: JSONSchemaType<PokemonResponse> = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    weight: { type: "integer" },
    height: { type: "integer" },
    sprites: {
      type: "object",
      properties: {
        front_default: { type: "string" },
      },
      required: [],
    },
    // doesntExist: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: true,
};

const fetchPokemon = async (id: string) => {
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  ).json();
  const validate = ajv.compile(pokemonSchema);
  if (validate(res)) return res;

  throw new Error(String(ajv.errors));
};

export const AjvComponent = () => {
  const [ajvId, setAjvId] = useState("");
  const { data } = useQuery(["pokemon", ajvId], () =>
    ajvId ? fetchPokemon(ajvId) : null
  );

  return (
    <div>
      <h1>Ajv</h1>
      <form>
        <label htmlFor="pokemonId">Pokemon number: </label>
        <input
          onChange={(e) => setAjvId(e.target.value)}
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
