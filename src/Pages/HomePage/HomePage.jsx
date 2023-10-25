import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
/* import url from "https://foodapp.adaptable.app/meals"; */
import axios from "axios";
import "./HomePage.css";

function HomePage() {
  const [searchParams] = useSearchParams();
  const [meals, setMeals] = useState(null);
  /* const [search, setSearch] = useState(""); */
  const query = searchParams.get("query");

  // let currentMeals = meals;

  async function fetchMeals() {
    // console.log("Fetching", query);
    try {
      const response = await axios.get("https://foodapp.adaptable.app/meals");

      setMeals(response.data.filter((x) => Boolean(x.ingredients)));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  if (!meals) {
    return <p>Loading...</p>;
  }

  let filteredMeals;
  if (query) {
    filteredMeals = meals.filter((meal) => {
      console.log(meal);
      // Check if some ingredients have a specific value
      const isThereTheIngredient = meal.ingredients.some((ingredient) => {
        const myRegex = new RegExp(query, "gi");
        return myRegex.test(ingredient.ingredient);
      });
      const isThereTheName = meal.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return isThereTheIngredient || isThereTheName;
    });
  } else {
    filteredMeals = meals;
  }

  /* console.log("meal", meals); */

  return (
    <>
      <div className="container">
        {/* <form action="">
          <input
            placeholder="Seach"
            type="text"
            value={search}
            onChange={(e) => {
              const copyBeers = [...beers];

              copyBeers.map((beer) => {
                if (beer.name.indexOf(e.target.value) > -1) {
                  return { ...beer, data_hidden: "true" };
                } else {
                  return { ...beer };
                }
              });
            }}
          />
        </form> */}
        {filteredMeals.map((meal) => {
          return (
            <Link
              key={meal.id}
              to={`/meals/${meal.id}`}
              data-hidden={meal.data_hidden ? meal.data_hidden : "false"}
            >
              <div className="meal">
                <div className="meal-img">
                  <img src={meal.image} alt={`${meal.name} Image`} />
                </div>
                <div className="meal-info">
                  <h3>{meal.name}</h3>
                  {/* <p>
                    <span>Created by: </span>
                    {beer.contributed_by &&
                    beer.contributed_by.indexOf(" <") > -1
                      ? beer.contributed_by.split(" <")[0]
                      : beer.contributed_by}
                  </p> */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
