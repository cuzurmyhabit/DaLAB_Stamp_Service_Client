import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Input from "./components/Input";
import './App.css'
import SideBar from './components/SideBar';
import ReceiverHome from './pages/RecevierHome';

function App() {

  return (
    <>
      <ReceiverHome/>

    </>
  );
    {
/*    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter> */}
}

export default App
