import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Assigment3 from "./components/Assigment3/Assigment3"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/assigment-3" element={<Assigment3 />} />
        </Routes>      
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
