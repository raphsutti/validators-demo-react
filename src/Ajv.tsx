import Ajv, { JSONSchemaType } from "ajv";
import { useState } from "react";
import { useQuery } from "react-query";

const ajv = new Ajv({ allErrors: true, verbose: true });

interface PokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_defaults: string;
  };
  // doesntExist: number;
}

const pokemonSchema: JSONSchemaType<PokemonData> = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    weight: { type: "integer" },
    height: { type: "integer" },
    sprites: {
      type: "object",
      properties: {
        front_defaults: { type: "string" },
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
  const valid = ajv.validate(pokemonSchema, res);
  if (!valid) console.error(ajv.errors);
  return res;
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
