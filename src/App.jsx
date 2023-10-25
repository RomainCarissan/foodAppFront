import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import FilterCountryPage from "./Pages/FilterCountryPage/FilterCountryPage";
import ReceipePage from "./Pages/ReceipePage/ReceipePage";
import FavPage from "./Pages/FavPage/FavPage";
import CreatePage from "./Pages/CreatePage/CreatePage";
import Navbar from "./components/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
/* import ConnexionPage from "./Pages/ConnexionPage/ConnexionPage"; */

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:category" element={<FilterPage />} />
        <Route path="/search/area/:area" element={<FilterCountryPage />} />
        <Route path="/meals/:id" element={<ReceipePage />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="/create" element={<CreatePage />} />
        {/*  <Route path="/connexion" element={<ConnexionPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
