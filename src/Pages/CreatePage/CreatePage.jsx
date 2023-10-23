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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
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
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="area">Area</label>
          <input
            type="text"
            name="area"
            value={recipe.area}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="instruction">Instruction</label>
          <input
            type="text"
            name="instruction"
            value={recipe.instruction}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Ingredient"
                value={recipe.ingredients.ingredient}
                onChange={(event) => handleChange(event, index)}
              />
              <input
                type="text"
                placeholder="Quantity"
                value={recipe.ingredients.quantity}
                onChange={(event) => handleChange(event, index)}
              />
            </div>
          ))}
          <div>
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
        </div>
        {/* <div>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            placeholder="ingredients"
            value={recipe.ingredients.ingredient}
            onChange={handleChange.ingredient}
          />
          <input
            type="text"
            placeholder="quantity"
            value={recipe.ingredients.quantity}
            onChange={handleChange}
          />
          <div>
            <button>Add Ingredient</button> */}
        <div>
          <label htmlFor="image">Image</label>
          <input
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
