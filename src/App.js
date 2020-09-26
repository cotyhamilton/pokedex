import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card'

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(15);
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    getPokemon();
  }, [offset]);

  useEffect(() => {
    if (pokemon.length) {
      pokemon.map((pokemon) => {
        getPokemonData(pokemon.name);
      })
    }
  }, [pokemon])

  const getPokemon = async () => {
    const options = { offset, limit }
    const list = await P.getPokemonsList(options)
    setPokemon((prevState) => ([...prevState, ...list.results]));
  };

  const getPokemonData = async (pokemon) => {
    const data = await P.getPokemonByName(pokemon);
    setPokemonData((prevState) => ({ ...prevState, [data.name]: data }))
  }

  const loadMore = async () => {
    await setOffset(offset + limit);
  }

  return (
    <div className="App">
      <div className="home">
        <h2>Pokedex</h2>
        <p>Search for pokemon by name or using the National Pokedex number</p>
        {pokemon.length ? pokemon.map((pokemon, index) => (
          !!pokemonData[pokemon.name] ?
            <Card
              details={!!pokemonData[pokemon.name] ? pokemonData[pokemon.name] : null}
            /> : null
        )): null }
      </div>
      <div className="page-navigation">
        <span onClick={loadMore}>more</span>
      </div>
    </div>
  );
}

export default App;
