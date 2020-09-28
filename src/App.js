import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { Icon, Input } from 'semantic-ui-react';
import Worker from 'workerize-loader!./workers/Worker'; // eslint-disable-line import/no-webpack-loader-syntax
import WorkerPool from './workers/WorkerPool';
import { TYPES, GENERATIONS } from './lib/constants';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

let workers = WorkerPool(Worker, navigator.hardwareConcurrency > 4 ? navigator.hardwareConcurrency : 4);

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(50);
  const [pokemonData, setPokemonData] = useState({});
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [pokemonByType, setPokemonByType] = useState({});
  const [pokemonByGeneration, setPokemonByGeneration] = useState({});
  const [activeType, setActiveType] = useState('');
  const [activeGen, setActiveGen] = useState('');

  useEffect(() => {
    getPokemon();
  }, [offset]);

  useEffect(() => {
    if (pokemon.length) {
      pokemon.map((pokemon) => {
        getPokemonData(pokemon.name);
      })
    }
    else {
      if (!search && allPokemon.length) {
        setPokemon([...allPokemon.slice(0,offset)])
      }
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
    TYPES.map((type) => {
      updatePokemonByType(type);
    })
  }, [])

  useEffect(() => {
    [...Array(GENERATIONS).keys()].map((i) => {
      const gen = i + 1;
      updatePokemonByGen(gen);
    });
  }, [])

  useEffect(() => {
    if (search === '') {
      setActiveGen('');
      setActiveType('');
      const list = allPokemon.slice(offset, offset + limit);
      setPokemon((prevState) => ([...list]));
    }
    else {
      if (search.includes(':')) {
        const query = (search.split(/:| /)).filter((s, index) => (s !== '')).map(s => s.toLowerCase());
        if (query.length > 1) {
          if (query.includes('gen')) {
            const gen = query[query.indexOf('gen') + 1];
            if (gen >= 1 && gen <= GENERATIONS) {
              setActiveGen(gen);
            } else { setActiveGen('') }
          } else { setActiveGen('') }
          if (query.includes('type')) {
            const type = query[query.indexOf('type') + 1];
            if (TYPES.includes(type)) {
              setActiveType(type);
            } else { setActiveType('') }
          } else { setActiveType('') }
        } else { setActiveType(''); setActiveGen(''); }
      }
      else {
        setActiveType('');
        setActiveGen('');
        const result = allPokemon.filter((pokemon, index) => {
          return pokemon.name.includes(search.toLowerCase()) || (index + 1).toString().includes(search);
        });
        console.log(result);
        setPokemon([...result]);
      }
    }
  }, [search]);

  // refactor this, wtf are you doing
  useEffect(() => {
    if (!activeGen && !activeType) {
      return;
    }
    let filteredPokemon = [];
    if (activeGen) {
      allPokemon.map((pokemon) => {
        if (pokemonByGeneration[activeGen].includes(pokemon.name)) {
          filteredPokemon.push(pokemon);
        }
      })
    }
    if (activeType) {
      if (filteredPokemon.length) {
        filteredPokemon = filteredPokemon.filter((pokemon) => {
          return pokemonByType[activeType].includes(pokemon.name)
        })
      }
      else {
        allPokemon.map((pokemon) => {
          if (pokemonByType[activeType].includes(pokemon.name)) {
            filteredPokemon.push(pokemon);
          }
        })
      }
    }
    setPokemon([...filteredPokemon]);
  }, [activeGen, activeType])

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
  }

  const updatePokemonByType = async (type) => {
    let list = [];
    const data = await P.getTypeByName(type);
    data.pokemon.map((pokemon) => {
      list.push(pokemon.pokemon.name);
    })
    setPokemonByType((prevState) => ({...prevState, [type]: list}))
  }

  const updatePokemonByGen = async (gen) => {
    const data = await P.getGenerationByName(gen);
    let names = [];
    data.pokemon_species.map((pokemon) => {
      names.push(pokemon.name)
    })
    setPokemonByGeneration((prevState) => ({...prevState, [gen]: names}))
  }

  return (
    <div className="App">
      <header>
        <Icon className="icon" name="sliders" size="large" />
      </header>
      <div className="home">
        <h1>Pokédex</h1>
        <p>Search for Pokémon by name, National Pokédex number, or tags like <code>type:grass gen:5</code></p>
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
