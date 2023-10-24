import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CreatePage() {
  const [recipe, setRecipe] = useState({
    name: "",
    area: "",
    category: "",
    instruction: "",
    ingredients: [{ name: "", quantity: "" }],
    image: "",
    video: "",
  });

  const [areasList, setAreasList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [allMeals, setAllMeals] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://foodapp.adaptable.app/meals");
        const mealData = response.data;
        setAllMeals(mealData);
        const uniqueCategories = [
          ...new Set(mealData.map((meal) => meal.category)),
        ];
        const uniqueCountries = [...new Set(mealData.map((meal) => meal.area))];

        setAreasList(uniqueCountries);
        setCategoriesList(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({
      ...recipe,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://foodapp.adaptable.app/meals",
        recipe
      );
      console.log("Recipe added successfully:", response.data);
      setRecipe({
        name: "",
        area: "",
        category: "",
        instruction: "",
        ingredients: [{ name: "", quantity: "" }],
        image: "",
        video: "",
      });
    } catch (error) {
      console.log("Error adding recipe:");
    }
  };
  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required="required"
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            required="required"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categoriesList.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="area">Area</label>
          <select
            required="required"
            name="area"
            value={recipe.area}
            onChange={handleChange}
          >
            <option value="">Select Area</option>
            {areasList.map((area) => {
              return <option value={area}>{area}</option>;
            })}
          </select>
        </div>

        <div>
          <label htmlFor="instruction">Instruction</label>
          <textarea
            required="required"
            type="text"
            name="instruction"
            value={recipe.instruction}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>

          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient}>
              <input
                required="required"
                type="text"
                placeholder="name"
                value={recipe.ingredients.name}
                onChange={handleChange}
              />

              <input
                required="required"
                type="text"
                placeholder="Quantity"
                value={recipe.ingredients.quantity}
                onChange={handleChange}
              />
            </div>
          ))}

          <div>
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            // required="required"
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video Link</label>
          <input
            type="text"
            name="video"
            value={recipe.data}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add Recipe</button>
        </div>
      </form>
    </div>
  );
}
export default CreatePage;
