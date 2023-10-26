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
      let uniqueCategories = [
        ...new Set(mealData.map((meal) => meal.category)),
      ];
      uniqueCategories = uniqueCategories.filter(Boolean);
      let uniqueCountries = [...new Set(mealData.map((meal) => meal.area))];
      uniqueCountries = uniqueCountries.filter(Boolean);
      setCategories(uniqueCategories);
      setCountries(uniqueCountries);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(categories);

  useEffect(() => {
    fetchFilter();
  }, []);

  if (!categories) {
    return <p>Loading...</p>;
  }

  /* const filteredMeals = selectedCategory
    ? allMeals.filter((meal) => meal.category === selectedCategory)
    : allMeals; */
  function getRandomDish(categoryOrArea) {
    const matchingDishes = allMeals.filter(
      (meal) => meal.category === categoryOrArea || meal.area === categoryOrArea
    );

    if (matchingDishes.length > 0) {
      const randomDish =
        matchingDishes[Math.floor(Math.random() * matchingDishes.length)];
      return randomDish.image; // Assuming "image" is the property for the dish image
    }

    // Return a placeholder image if no matching dish is found
    return "https://zechef.com/wp-content/uploads/2020/09/saucisse-droite-ardeche-boutiquedessaucissons.jpg"; // Replace with the actual path to a placeholder image
  }

  return (
    <>
      <h1>What do you want to cook today ?</h1>
      <div className="all-categories">
        <h2>Categories : </h2>
        {categories.map((category) => {
          // console.log(category);
          return (
            <Link key={category} to={`/search/${category.toLowerCase()}`}>
              <div className="category">
                <div className="category-img">
                  <img
                    src={getRandomDish(category)}
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
                    src={getRandomDish(country)}
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
