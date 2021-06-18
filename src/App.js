import React, {  useEffect,useState } from 'react';
import Card from './cards/card';
import { getPokemon, getAllPokemon } from './functions/getPokemon';
import './App.css';
import typeColors from './types/types';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialURL, setInitialUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')
 
  const [pokemons, setPokemons] = useState([]);
  const def = (val) => {
    console.log(val)
    setInitialUrl(`https://pokeapi.co/api/v2/pokemon?limit=${val}`)
  }



  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [initialURL])

  console.log(typeColors)

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }



  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
    setPokemons(_pokemonData);
  }
  
  const sortByType = (type) => {
    const mp = pokemonData.filter(item => item.types[0].type.name === type)
    setPokemons(mp)
  }


  const searchedPokemons = (input) => {
    const mp = pokemonData.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(input.toLowerCase())
  })
    setPokemons(mp)
  }


  return (
    <>
      <div>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading</h1> : (
          <>
            <input type="text" placeholder="search pokemon" className='input'
            onChange={(event) => searchedPokemons(event.target.value)}
            />
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            <div className="btn">
              <button onClick={() => def(10)}>10 pokemons</button>
              <button onClick={() => def(20)}>20 pokemons</button>
              <button onClick={() => def(50)}>50 pokemons</button>
              <button onClick={() => setPokemons(pokemonData)}>Clear</button>
            </div>
            <div className="btn"> 
            <button style={{ backgroundColor: typeColors.water }} onClick={() => sortByType("water")}>Water</button>
            <button style={{ backgroundColor: typeColors.bug }} onClick={() => sortByType("bug")}>Bug</button>
            <button style={{ backgroundColor: typeColors.fairy }} onClick={() => sortByType("fairy")}>Fairy</button>
            <button style={{ backgroundColor: typeColors.fire }} onClick={() => sortByType("fire")}>Fire</button>
            <button style={{ backgroundColor: typeColors.poison }} onClick={() => sortByType("poison")}>Poison</button>
            <button style={{ backgroundColor: typeColors.dragon }} onClick={() => sortByType("dragon")}>Dragon</button>
            <button style={{ backgroundColor: typeColors.flying }} onClick={() => sortByType("flying")}>Flying</button>
            <button style={{ backgroundColor: typeColors.ghost }} onClick={() => sortByType("ghost")}>Ghost</button>
            <button style={{ backgroundColor: typeColors.ground }} onClick={() => sortByType("ground")}>Ground</button>
            <button style={{ backgroundColor: typeColors.normal }} onClick={() => sortByType("normal")}>Normal</button>
            <button style={{ backgroundColor: typeColors.steel }} onClick={() => sortByType("steel")}>Steel</button>
            <button style={{ backgroundColor: typeColors.dark }} onClick={() => sortByType("dark")}>Dark</button>
            <button style={{ backgroundColor: typeColors.electric }}onClick={() => sortByType("electric")}>Electric</button>
            <button style={{ backgroundColor: typeColors.fighting }} onClick={() => sortByType("fighting")}>Fighting</button>
            <button style={{ backgroundColor: typeColors.grass }} onClick={() => sortByType("grass")}>Grass</button>
            <button style={{ backgroundColor: typeColors.ice }} onClick={() => sortByType("ice")}>Ice</button>
            <button style={{ backgroundColor: typeColors.rock }} onClick={() => sortByType("rock")}>Rock</button>
            <button style={{ backgroundColor: typeColors.psychic }} onClick={() => sortByType("psychic")}>Physic</button>
            </div>
            <div className="grid-container">
              {pokemons.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;