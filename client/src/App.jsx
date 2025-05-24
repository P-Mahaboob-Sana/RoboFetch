import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tablets from './components/Tablets/Tablets.jsx';
import Cart from './components/Cart/Cart.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './components/HomePage/HomePage.jsx';

function App(){
  return(
     <Router>
      <Navbar />
      <Routes>
        <Route path ="/" element={<HomePage />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;