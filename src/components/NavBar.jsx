import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import FavPage from "../Pages/FavPage/FavPage";
import CreatePage from "../Pages/CreatePage/CreatePage";

function NavBar() {
  return (
    <>
      <nav>
        <Link to="/">
          <div>
            <img src="" alt="Home Page" />
          </div>
        </Link>
        <Link to="/search">
          <div>
            <img src="" alt="Search Page" />
          </div>
        </Link>
        <Link to="/Favories">
          <div>
            <img src="" alt="Fav Page" />
          </div>
        </Link>
        <Link to="/create">
          <div>
            <img src="" alt="Create Page" />
          </div>
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
