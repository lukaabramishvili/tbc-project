import './App.css';
import Home from "./app/home/page" 


function App() {
  return (
    <div className="App">
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/assigment-3" element={<Assigment3 />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>       */}
        <Home/>
    </div>
  );
}

export default App;
