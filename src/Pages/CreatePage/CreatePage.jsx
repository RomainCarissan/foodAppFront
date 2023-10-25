import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CreatePage() {
  const [recipe, setRecipe] = useState({
    name: "",
    area: "",
    category: "",
    instruction: "",
    ingredients: [{ ingredient: "", quantity: "" }],
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
      ingredients: [...recipe.ingredients, { ingredient: "", quantity: "" }],
    });
  };

  const handleIngredientChange = (event, index, field) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = event.target.value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  /* const handleImageUpload = async (event) => {
    event.preventDefault();
    const imageFile = event.target.files[0];

    try {
      // const formData = new FormData();
      //formData.append("image", imageFile); 

      const response = await axios.post(
        "https://foodapp.adaptable.app/meals",
        recipe
        // formData 
      );
      const imageURL = response.data.imageUrl;
      setRecipe({
        ...recipe,
        image: imageURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }; */

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
        ingredients: [{ ingredient: "", quantity: "" }],
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
              <option key={category} value={category}>
                {category}
              </option>
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
              return (
                <option key={area} value={area}>
                  {area}
                </option>
              );
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

          {/* {recipe.ingredients.map((ingredients, index) => (
            <div key={index}>
              <input
                required="required"
                type="text"
                placeholder="name"
                value={recipe.ingredients.ingredient}
                onChange={(e) => handleChange(e, index, `ingredient`)}
              />

              <input
                required="required"
                type="text"
                placeholder="Quantity"
                value={recipe.ingredients.quantity}
                onChange={(e) => handleChange(e, index, `quantity`)}
              />
            </div>
          ))} */}

          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                required="required"
                type="text"
                placeholder="name"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(e, index, "ingredient")}
              />
              <input
                required="required"
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(e, index, "quantity")}
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
            required="required"
            //type="file"
            type="text"
            //accept="image/*"
            name="image"
            placeholder="Image URL"
            value={recipe.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video Link</label>
          <input
            type="text"
            name="video"
            placeholder="Video URL"
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
