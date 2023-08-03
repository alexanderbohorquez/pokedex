import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'; // Importamos el archivo de estilos

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

const Items = () => {
  const userName = useSelector(state => state.userName);
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [evolutions, setEvolutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => setPokemon(res.data))
      .catch(error => console.log('Error fetching Pokemon data:', error));

    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then(res => {
        const evolutionChainUrl = res.data.evolution_chain.url;
        return axios.get(evolutionChainUrl);
      })
      .then(res => {
        const evolutionChain = res.data.chain;
        const evolutions = [];
        extractEvolutions(evolutionChain, evolutions);
        setEvolutions(evolutions);
      })
      .catch(error => console.log('Error fetching evolution data:', error));
  }, [id]);

  const extractEvolutions = (evolutionChain, evolutions) => {
    const speciesName = evolutionChain.species.name;
    const evolvesTo = evolutionChain.evolves_to;

    if (speciesName !== pokemon.name) {
      if (!evolutions.some(evolution => evolution.name === speciesName)) {
        evolutions.push({
          name: speciesName,
          spriteUrl: null,
          shinySpriteUrl: null,
        });
      }
    }

    if (evolvesTo && evolvesTo.length > 0) {
      evolvesTo.forEach(evolution => {
        const speciesName = evolution.species.name;
        if (!evolutions.some(evolution => evolution.name === speciesName)) {
          evolutions.push({
            name: speciesName,
            spriteUrl: null,
            shinySpriteUrl: null,
          });
          fetchPokemonSprite(speciesName);
          extractEvolutions(evolution, evolutions);
        }
      });
    }
  };

  const fetchPokemonSprite = (speciesName) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesName}/`)
      .then(res => {
        const spriteUrl = res.data.sprites?.versions["generation-v"]["black-white"].animated.front_default;
        const shinySpriteUrl = res.data.sprites?.versions["generation-v"]["black-white"].animated.front_shiny;
        setEvolutions(prevEvolutions => {
          const updatedEvolutions = prevEvolutions.map(evolution => {
            if (evolution.name === speciesName) {
              return { ...evolution, spriteUrl, shinySpriteUrl };
            }
            return evolution;
          });
          return updatedEvolutions;
        });
      })
      .catch(error => console.log(`Error fetching ${speciesName} data:`, error));
  };

  // Function to get the color of the type
  const getTypeColor = (typeName) => {
    return typeColors[typeName] || 'rgba(168, 160, 144, 0.9)'; // Default color for unknown types
  };

  return (
    <div className='pokedex-container-item'>
    <button className="retro-button go-back-button" onClick={() => navigate(-1)}>Go Back</button>
    <div className="pokemon-card1" style={{ backgroundColor: typeColors[pokemon.types?.[0]?.type.name] }}>
      <div className="pokemon-images">
        {pokemon.sprites && (
          <>
            <img
              className="pokemon-image main-image"
              src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
              alt={pokemon.name}
            />
            <img
              className="pokemon-image shiny-image"
              src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny}
              alt={`Shiny ${pokemon.name}`}
            />
          </>
        )}
      </div>
      <div className="pokemon-info">
        <h3 className="pokedex-text pokemon-name">{pokemon.name}</h3>
        <p className="pokedex-text pokemon-info">Height: {pokemon.height}</p>
        <p className="pokedex-text pokemon-info">Weight: {pokemon.weight}</p>
        <p className="pokedex-text pokemon-info">Base Experience: {pokemon.base_experience}</p>
        <p className="pokedex-text pokemon-info">Abilities:</p>
        <ul className="pokemon-abilities">
          {pokemon.abilities &&
            pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="pokedex-text">{ability.ability.name}</li>
            ))}
        </ul>
        <p className="pokedex-text pokemon-info">Types:</p>
        <ul className="pokemon-types">
          {pokemon.types &&
            pokemon.types.map((type) => (
              <li key={type.type.name} className="pokedex-text" style={{ background: getTypeColor(type.type.name) }}>
                {type.type.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="evolutions-card">
        <p className="pokedex-text">Evolutions:</p>
        {evolutions.length > 0 ? (
          <ul className="pokemon-abilities">
            {evolutions.map((evolution, index) => (
              <li key={index} className="pokedex-text">
                {evolution.name}
                {evolution.spriteUrl && (
                  <div className="pokemon-images">
                    <img
                      className="pokemon-image main-image"
                      src={evolution.spriteUrl}
                      alt={evolution.name}
                    />
                    <img
                      className="pokemon-image shiny-image"
                      src={evolution.shinySpriteUrl}
                      alt={`Shiny ${evolution.name}`}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="pokedex-text">No evolutions found.</p>
        )}
      </div>
    </div>
  </div>
  );
};



export default Items;
