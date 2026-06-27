import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loja" element={<StorePage />} />
            <Route path="/carrinho" element={<CartPage />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
