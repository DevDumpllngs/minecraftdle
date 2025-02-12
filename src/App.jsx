import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import MobsGame from "./pages/MobsGame";
import BiomesGame from "./pages/BiomesGame";
import ItemsGame from "./pages/ItemsGame";
import Bestiary from "./pages/Bestiary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobs" element={<MobsGame />} />
        <Route path="/biomes" element={<BiomesGame />} />
        <Route path="/items" element={<ItemsGame />} />
        <Route path="/stats" element={<Bestiary />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
