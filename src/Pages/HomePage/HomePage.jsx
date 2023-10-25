import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/* import url from "https://foodapp.adaptable.app/meals"; */
import axios from "axios";
import "./HomePage.css";

function HomePage() {
  const [meals, setMeals] = useState(null);
  /* const [search, setSearch] = useState(""); */

  let currentMeals = meals;

  async function fetchMeals() {
    try {
      const response = await axios.get("https://foodapp.adaptable.app/meals");
      setMeals(response.data);
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
        {meals.map((meal) => {
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
