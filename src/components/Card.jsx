import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getTypeColor = (type) => {
  const typeColors = {
    water: 'rgba(56, 153, 248, 0.9)',
  bug: 'rgba(168, 184, 32, 0.9)',
  dragon: 'rgba(120, 96, 224, 0.9)',
  electric: 'rgba(248, 208, 48, 0.9)',
  ghost: 'rgba(96, 96, 176, 0.9)',
  fire: 'rgba(240, 80, 48, 0.9)',
  fairy: 'rgba(231, 159, 231, 0.9)',
  ice: 'rgba(88, 200, 224, 0.9)',
  fighting: 'rgba(160, 80, 56, 0.9)',
  normal: 'rgba(168, 160, 144, 0.9)',
  grass: 'rgba(120, 200, 80, 0.9)',
  psychic: 'rgba(248, 112, 160, 0.9)',
  rock: 'rgba(184, 160, 88, 0.9)',
  dark: 'rgba(122, 88, 72, 0.9)',
  ground: 'rgba(234, 214, 164, 0.9)',
  poison: 'rgba(176, 88, 160, 0.9)',
  flying: 'rgba(152, 168, 240, 0.9)',
  };

  return typeColors[type.toLowerCase()] || '#333'; 
};

const Card = ({ url }) => {
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data));
  }, []);

  if (!pokemon.name) {
    return null;
  }

  return (
    <div className={`pokemon-card tipo-${pokemon.types && pokemon.types[0].type.name}`} style={{ backgroundColor: getTypeColor(pokemon.types && pokemon.types[0].type.name) }} onClick={() => navigate(`/pokedex/${pokemon.id}`)}>
      <img className="pokemon-image" src={pokemon.sprites?.versions["generation-iv"]["diamond-pearl"].front_default} alt="" />
      <div className="pokemon-details">
        <div className="pokemon-name">{pokemon.name}</div>
        <div className="pokemon-name">#{pokemon.id}</div>
        <div className="pokemon-types">
          {pokemon.types &&
            pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`pokemon-type tipo-${type.type.name}`}
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
