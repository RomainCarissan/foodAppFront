import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  /* const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get("https://foodapp.adaptable.app/meals");
        const allRecipes = response.data;
        const recipesWithOnion = allRecipes.filter((recipe) => {
          return recipe.ingredients.some((ingredient) =>
            ingredient.name.includes("onion")
          );
        });
        setRecipes(recipesWithOnion);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes with Onion</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.area}</p>
          </li>
        ))}
      </ul>
    </div>
  ); */

  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [searchedMeals, setSearchedMeals] = useState();

  const formatedInput =
    searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
  console.log(formatedInput);

  const getMealList = async () => {
    try {
      const response = await axios.get(`https://foodapp.adaptable.app/meals`);
      console.log(response.data[0].ingredients);
      if (response.data.meals) {
        setMeals(response.data.meals);
        setError(null);
        console.log("yeeeeeeeeaaaaahhhh");
      } else {
        setMeals([]);
        setError("Sorry, we didn't find any meal!");
        console.log(response);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (searchInput) {
      getMealList();
    }
  }, [searchInput]);

  if (!setSearchInput) {
    return <p>Loading...</p>;
  }

  return (
    <div className="top-search">
      <input
        className="search-input"
        type="text"
        placeholder="Enter an ingredient"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={getMealList}>Search</button>

      <div className="search-bar-elements">
        {meals.map((meal) => (
          <Link key={meal.id} to={`/meals/${meal.id}`}>
            <div className="filtered-meal">
              <div className="filtered-meal-img">
                <img src={meal.image} alt={`${meal.name} Image`} />
              </div>
              <div className="filtered-meal-info">
                <h3>{meal.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
