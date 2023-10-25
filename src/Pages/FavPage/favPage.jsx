import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function favPage() {
  const [meals, setMeals] = useState(null);
  const [favMember, setFavMember] = useState(null);
  let arrFav = [];
  let userId = localStorage.getItem("id");
  /* const [search, setSearch] = useState(""); */
  console.log(userId);
  async function fetchMeals() {
    try {
      const response = await axios.get("https://foodapp.adaptable.app/meals");
      setMeals(response.data);
      const answer = await axios.get(
        "https://foodapp.adaptable.app/members/" + userId
      );
      console.log(response.data);
      // setFavMember(answer.data[userId].favorite);
      // const fav = answer.data[0].favorite;
      // const user = answer.data.find((user) => user.id === userId);
      const user = answer.data;
      if (user) {
        setFavMember(user.favorite);
      } else {
        console.log("User not found");
      }
      console.log(setMeals);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMeals();
  }, []);

  if (!meals) {
    return <p>No connected yet</p>;
  }

  if (!favMember) {
    return <p>No Favories yet</p>;
  }

  {
    favMember.map((fav) => {
      return arrFav.push(fav.id);
    });
  }
  console.log(arrFav);
  /* console.log("meal", meals); */

  return (
    <>
      <div className="all-meals">
        <div className="all-meals">
          {arrFav.map((idmeal) =>
            meals.map((meal) => (
              <React.Fragment key={meal.id}>
                {Number(idmeal) === Number(meal.id) ? (
                  <Link
                    key={meal.id}
                    to={`/meals/${meal.id}`}
                    data-hidden={meal.data_hidden ? meal.data_hidden : "false"}
                  >
                    {/* {console.log(member)} */}
                    <div className="meal">
                      <div className="meal-img">
                        <img src={meal.image} alt={`${meal.name} Image`} />
                      </div>
                      <div className="meal-info">
                        <h3>{meal.name}</h3>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <p> </p>
                )}
                {/* {console.log(idmeal)} */}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default favPage;
