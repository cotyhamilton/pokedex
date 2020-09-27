import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { Icon, Input } from 'semantic-ui-react';
import Worker from 'workerize-loader!./workers/Worker'; // eslint-disable-line import/no-webpack-loader-syntax
import WorkerPool from './workers/WorkerPool';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

let workers = WorkerPool(Worker, 4);

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(50);
  const [pokemonData, setPokemonData] = useState({});
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPokemon();
  }, [offset]);

  useEffect(() => {
    if (pokemon.length) {
      pokemon.map((pokemon) => {
        getPokemonData(pokemon.name);
      })
    }
  }, [pokemon]);

  useEffect(() => {
    getAllPokemon();
  }, []);

  useEffect(() => {
    if (allPokemon.length) {
      allPokemon.map((pokemon) => (
        workerFetch(pokemon)
      ));
    }
  }, [allPokemon]);

  useEffect(() => {
    if (search === '') {
      const list = allPokemon.slice(offset, offset + limit);
      setPokemon((prevState) => ([...list]));
    }
    else {
      const result = allPokemon.filter((pokemon, index) => (
        pokemon.name.includes(search) || (index + 1).toString().includes(search)
      ));
      setPokemon((prevState) => ([...result]))
    }
  }, [search]);

  const getPokemon = async () => {
    if (allPokemon.length > offset + limit) {
      const list = allPokemon.slice(offset, offset + limit);
      setPokemon((prevState) => ([...prevState, ...list]));
    }
    else {
      const options = { offset, limit };
      const list = await P.getPokemonsList(options);
      setPokemon((prevState) => ([...prevState, ...list.results]));
    }
  }

  const getPokemonData = async (pokemon) => {
    if (!pokemonData.pokemon) {
      const data = await P.getPokemonByName(pokemon);
      setPokemonData((prevState) => ({ ...prevState, [data.name]: data }))
    }
  }

  const getAllPokemon = async () => {
    const list = await P.getPokemonsList();
    setAllPokemon([...list.results]);
  }

  const loadMore = async () => {
    await setOffset(offset + limit);
  }

  const workerFetch = async (pokemon) => {
    const data = await workers.fetch(pokemon);
    setPokemonData((prevState) => ({ ...prevState, [data.name]: data }))
  }

  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <Icon className="icon" name="sliders" size="large" />
      </header>
      <div className="home">
        <h1>Pokédex</h1>
        <p>Search for Pokémon by name or using the National Pokédex number</p>
        <Input
          fluid
          icon="search"
          iconPosition="left"
          placeholder="What Pokémon are you looking for?"
          onChange={handleChange}
        />
        {pokemon.length ? pokemon.map((pokemon, index) => (
          !!pokemonData[pokemon.name] ?
            <Card
              details={!!pokemonData[pokemon.name] ? pokemonData[pokemon.name] : null}
            /> : null
        )) : null}
      </div>
      {search === '' ?
        <div className="page-navigation">
          <span onClick={loadMore}>more</span>
        </div>
        : null}
    </div>
  );
}

export default App;
