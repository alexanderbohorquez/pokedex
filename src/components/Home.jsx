import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../store/slices/userName.slice';


const Home = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goPokedex = () => {
        dispatch(getUsername(name));
        navigate("/pokedex")
    }

    return (
        <div className='home'>
            <div className='container__home'>
                <img className='logo__home' src="logopokemon.png" alt="logo" />
                <p className='tittle__home'><strong>Pokedex </strong></p>
                <div class="nes-field">
                    <label for="name_field">Your name</label>
                    <input className='nes-input ' type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <br />
                <button className='nes-btn is-success' onClick={() => goPokedex()}>Go</button>
            </div>
        </div>
    );
};

export default Home;