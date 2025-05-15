// src/RoutesPath/AppRoutes.jsx
import { Home } from '../pages/home';
import { LoginReact } from '../pages/LoginReact';
import { Routes, Route } from 'react-router-dom'; // Importando o correto 'Routes'

import { About } from '../components/pagesComponents/About';
import { Suport } from '../components/pagesComponents/Suport';
import { Products } from '../components/pagesComponents/Products';

export function RoutesReact() {
  return (
    <Routes> 
      <Route path="/" element={<LoginReact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/suport" element={<Suport />} />
        <Route path="/products" element={<Products />} />
    </Routes>
  );
}