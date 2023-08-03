import axios from 'axios';
import React, { useState } from 'react';
import ByType from './ByType';
import Card from './Card';
import Pagination from './Pagination';

const GetPokemons = ({ pokemons, setPokemons }) => {
    const [page, setPage] = useState(1)
    const perPage = 20
    const lastIndex = perPage * page



    const getByType = (url) => {
        setPage(1)
        axios.get(url)
            .then(res => setPokemons(res.data))
        console.log(url);
    }

    let shortRoutePokemons
    let shortRouteCount
    const route = () => {
        if (pokemons?.results) {
            shortRoutePokemons = pokemons?.results
            shortRouteCount = pokemons?.count
        } else {
            shortRoutePokemons = pokemons.pokemon
            shortRouteCount = pokemons.pokemon?.length
        }
    }
    route()

    const totalPages = Math.ceil(shortRouteCount / perPage);
    const pokemonsToShow = shortRoutePokemons?.slice(lastIndex - perPage, lastIndex)
    const arrayIteracion = []
    const iteracion = () => {
        for (let i = 1; i <= totalPages; i++) {
            arrayIteracion.push(i)
        }
    }
    iteracion();

    let acces
    const selectAcces = () => {
        if (totalPages > 10) {
            if (page > totalPages - 5) {
                acces = arrayIteracion.slice(totalPages - 10, totalPages)
            } else if (page > 5) {
                acces = arrayIteracion.slice(page - 5, page + 5)
            } else {
                acces = arrayIteracion.slice(0, 10)
            }
        } else {
            acces = arrayIteracion.slice(0, totalPages)
        }
    }
    selectAcces();
    console.log(page);
    return (
        <div className="pokemon-list-container">
      <ByType getByType={getByType} />
      <div className="cards-container">
        {pokemonsToShow?.map((pokemon) => (
          <Card
            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
          />
        ))}
      </div>
      <div className="pagination-container">
        {acces.map((num) => (
          <Pagination num={num} key={num} setPage={setPage} />
        ))}
      </div>
      <footer className="footer">
        CREADO POR ALEXBORK
      </footer>
    </div>
  );
};

export default GetPokemons;