import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import GetPokemons from './GetPokemons';
import ByType from './ByType';

const Pokedex = () => {
    const userName = useSelector(state => state.userName)
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([])
    const [search, setSearch] = useState("")
    const [suggestion, setSuggestion] = useState([])

    useEffect(() => {
        getAllPokemons();
    }, [])

    const getAllPokemons = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res => setPokemons(res.data))
    }


    return (
        <div>
        <div className='pokedex'>
        <button onClick={() => navigate(-1)} className='nes-btn is-error'>Go Back</button>
          <div className='pokedex-search'>
            <input className='nes-input' type="text" value={search} onChange={(e => setSearch(e.target.value))} />
            <button onClick={() => navigate(`/pokedex/${search}`)} className='nes-btn is-primary' >Search</button>
          </div>
        </div>
        <div>
          <h1 className='tittle__pokedex'>Hola {userName} bienvenido a tu pokedex! </h1>
          <GetPokemons pokemons={pokemons} setPokemons={setPokemons} />
        </div>
      </div>
    );
};

export default Pokedex;