import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import FavPage from "../Pages/FavPage/favPage";
import CreatePage from "../Pages/CreatePage/CreatePage";

function NavBar() {
  return (
    <>
      <nav className="bottom-nav">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <div>
            <img src="" alt="Home Page" />
          </div>
        </Link>
        <Link to="/search">
          <div>
            <img src="" alt="Search Page" />
          </div>
        </Link>
        <Link to="/favorites">
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
