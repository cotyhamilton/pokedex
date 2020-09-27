const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

export async function fetch(pokemon) {
    return await P.getPokemonByName(pokemon.name);
}