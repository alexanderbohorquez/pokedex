import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ByType = ({getByType}) => {
    const [types, setTypes] = useState({})
    
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data))
    }, [])

    return (
        <div className='container__select'>
            <div className='nes-select'>
            <select name="" id="" onChange={e => getByType(e.target.value)}>
                <option value="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279">AllPokemons</option>
            
            {
                types.results?.map((type) => (
                    <option value={type.url} key={type.url}>{type.name}</option>
                ))
            }
            </select>
            
        </div>
        </div>
    );
};

export default ByType;