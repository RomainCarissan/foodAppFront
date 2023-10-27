import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./FilterPage.css";

function FilterPage() {
  const [filteredMeals, setFilteredMeals] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  let currentFilteredMeals = filteredMeals;
  const { category } = useParams();
  //const { filter} = useParams();
  /* const area = searchParams.get("area");
  const category = searchParams.get("category"); */
  /* console.log(area, category); */
  const formatedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  console.log(formatedCategory);

  useEffect(() => {
    const fetchFilteredMeals = async () => {
      try {
        const response = await axios.get(
          `https://foodapp.adaptable.app/meals?category=${formatedCategory}`
        );
        //console.log(response.data);
        /* let response;
        if () {
          response = await axios.get(
            `https://foodapp.adaptable.app/meals?category=${category}`
          );
        } else if () {
          response = await axios.get(
            `https://foodapp.adaptable.app/meals?area=${area}`
          );
        } */
        //console.log(response);
        setFilteredMeals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilteredMeals();
  }, [formatedCategory]);

  if (!filteredMeals) {
    return <p>Loading...</p>;
  }

  console.log(filteredMeals);
  /* console.log("meal", meals); */

  return (
    <>
      <div className="container-category">
        {/* <div className="filtered-meals"> */}
        {filteredMeals.map((meal) => {
          return (
            <Link
              key={meal.id}
              to={`/meals/${meal.id}`}
              /* data-hidden={meal.data_hidden ? meal.data_hidden : "false"} */
            >
              <div className="filtered-meal-category">
                <div className="filtered-meal-category-img">
                  <img src={meal.image} alt={`${meal.name} Image`} />
                </div>
                <div className="filtered-meal-category-info">
                  <h3>{meal.name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
        {/* </div> */}
      </div>
    </>
  );
}

export default FilterPage;
