import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchPage() {
  const [allMeals, setAllMeals] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  let currentCategory = categories;
  let currentCountry = countries;

  async function fetchFilter() {
    try {
      const response = await axios.get("https://foodapp.adaptable.app/meals");
      const mealData = response.data;
      setAllMeals(mealData);
      const uniqueCategories = [
        ...new Set(mealData.map((meal) => meal.category)),
      ];
      const uniqueCountries = [...new Set(mealData.map((meal) => meal.area))];
      setCategories(uniqueCategories);
      setCountries(uniqueCountries);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFilter();
  }, []);

  if (!categories) {
    return <p>Loading...</p>;
  }

  /* const filteredMeals = selectedCategory
    ? allMeals.filter((meal) => meal.category === selectedCategory)
    : allMeals; */

  return (
    <>
      <h1>What do you want to cook today ?</h1>
      <div className="all-categories">
        <h2>Categories : </h2>
        {categories.map((category) => {
          return (
            <Link key={category} to={`/search/${category.toLowerCase()}`}>
              <div className="category">
                <div className="category-img">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.4AlkCCZp4Y_HExxSvCZgLAHaEw&pid=Api"
                    style={{ height: "10vw" }}
                    alt={`${category} Image`}
                  />
                </div>
                <div className="category-info">
                  <h3>{category}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="all-countries">
        <h2>Countries :</h2>
        {countries.map((country) => {
          return (
            <Link key={country} to={`/search/area/${country.toLowerCase()}`}>
              <div className="country">
                <div className="country-img">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.4AlkCCZp4Y_HExxSvCZgLAHaEw&pid=Api"
                    style={{ height: "10vw" }}
                    alt={`${country} Image`}
                  />
                </div>
                <div className="category-info">
                  <h3>{country}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default SearchPage;
