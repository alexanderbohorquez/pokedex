import { useState } from 'react'
import './App.css'
import Pokedex from './components/Pokedex'
import Items from './components/Items'
import Home from './components/Home'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokedex/:id' element={<Items />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
