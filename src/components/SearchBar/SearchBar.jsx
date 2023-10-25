import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import "./SearchBar.css";
import HomePage from "../../Pages/HomePage/HomePage";
import { Navigate } from "react-router-dom";

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
  const [allMeals, setAllMeals] = useState(null);
  const [searchInput, setSearchInput] = useSearchParams("");
  const [error, setError] = useState(null);
  const [mealsIngredients, setMealsIngredients] = useState([]);
  //   const [searchedMeals, setSearchedMeals] = useSearchParams('');

  //   const formatedInput =
  //     searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
  //   console.log(formatedInput);

  const fetchAllMeal = async () => {
    try {
      const response = await axios.get(`https://foodapp.adaptable.app/meals`);
      console.log(response.data);
      const ingredientsData = response.data;
      setAllMeals(ingredientsData);
      const uniqueIngredients = [
        ...new Set(ingredientsData.map((meal) => meal.ingredients)),
      ];
      //console.log(uniqueIngredients);
      setMealsIngredients(uniqueIngredients);

      /* if (response.data.meals) {
        setMeals(response.data.meals);
        setError(null);
        console.log("yeeeeeeeeaaaaahhhh");
      } else {
        setMeals([]);
        setError("Sorry, we didn't find any meal!");
        console.log(response); */
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    // fetchAllMeal();
  }, []);

  //   let displayedMeals

  //   if (searchInput) {
  //     displayedMeals
  //   } else {
  //     displayedMeals = allMeals
  //   }

  /* const handleChange = (e) => {
          const newQuery = e.target.value;
          history.push({ pathname: "/", search: `?query=${newQuery}` });
        }; */
  /* const [searchParams] = useSearchParams();
        const searchInHomePage = (e) => {
          searchParams.get("query");
          console.log(searchParams);
        }; */
  const handleChange = (e) => {
    setSearchInput((params) => {
      params.set("query", e.target.value);
      /* Navigate(`/${params}`); */
      return params;
    });
  };

  /*   const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  console.log(query); */

  return (
    <div className="top-search">
      <input
        className="search-input"
        type="text"
        placeholder="Enter an ingredient or a meal name"
        value={searchInput.query}
        onChange={handleChange}
      />
      <Link to={`/?query=${searchInput.get("query")}`}>
        <button>Search</button>
      </Link>

      {/* <div className="search-bar-elements">
        {mealsIngredients.map((meal) => (
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
      </div> */}
    </div>
  );
}

export default SearchBar;
