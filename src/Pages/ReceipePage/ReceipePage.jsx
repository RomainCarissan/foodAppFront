import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ReceipePage() {
  const [oneReceipe, setOneReceipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(null);
  // const [favMember, setFavMember] = useState(null);
  const params = useParams();

  // dernier ajout

  // async function fetchMembers() {
  //   try {
  //     const response = await axios.get("https://foodapp.adaptable.app/members");
  //     // setFavMember(answer.data[userId].favorite);
  //     // const fav = answer.data[0].favorite;
  //     // const user = answer.data.find((user) => user.id === userId);
  //     const user = response.data;
  //     // console.log(user);
  //     if (user) {
  //       setFavMember(user);
  //     } else {
  //       console.log("User not found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchMembers();
  // }, []);
  // dernier ajout
  let user = JSON.parse(localStorage.getItem("user"));

  async function updateUser() {
    try {
      const response = await axios.put(
        "https://foodapp.adaptable.app/members/" + user.id,
        user
      );
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(params.id);
  useEffect(() => {
    const fetchOneReceipe = async () => {
      try {
        const response = await axios.get(
          `https://foodapp.adaptable.app/meals?id=${params.id}`
        );
        // const filtered = response.data[0].filter((id) => params.id === id);
        // console.log(filtered);
        // const receipeData = response.data[(id =params.id)];
        setOneReceipe(response.data[0]);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchOneReceipe();
  }, [params.id]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!oneReceipe) {
    return <p>Error: Receipe not found</p>;
  }
  const ingredients = oneReceipe.ingredients;

  const handleAddToFavorite = async (id) => {
    user.favorite.push({ id: String(id) });
    await updateUser();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <h2>Receipe</h2>
      <div>
        <img className="photo" src={oneReceipe.image} />
        <h2>{oneReceipe.name}</h2>
        {/* {console.log(ingredients)} */}
        <div>
          {ingredients.map((ingredient) => {
            return (
              <>
                <li>
                  Ingredient : {ingredient.ingredient} Quantity :
                  {ingredient.quantity}
                </li>
              </>
            );
          })}
        </div>
        <p>Instructions : {oneReceipe.instructions}</p>
        <p>Area : {oneReceipe.area}</p>
        <Link key={oneReceipe.video} to={oneReceipe.video} target="_blank">
          <p>{oneReceipe.video}</p>
        </Link>
        <button onClick={() => handleAddToFavorite(oneReceipe.id)}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </>
  );
}
export default ReceipePage;
