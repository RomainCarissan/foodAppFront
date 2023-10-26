import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import favPage from "../FavPage/favPage";

function ConnexionPage() {
  const [members, setMembers] = useState(null);
  const [idInput, setIdInput] = useState("");
  const [pdInput, setPdInput] = useState("");
  //   let idArr = [];

  //   useEffect(() => {
  //     const fetchMembers = async () => {
  //     };

  //     fetchMembers();
  //   }, []);
  //   if (!members) {
  //     return <p>Loading...</p>;
  // }
  //   if (members.id === textImput.name && members.login === textImput.password) {
  // Link to favPage
  //   } else {
  // <p>your id or your password are not good : try again</p>
  //   }
  //   window.localStorage.setItem("id", members.id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://foodapp.adaptable.app/members?username=${idInput}&login=${pdInput}`
      );
      // const filtered = response.data[0].filter((id) => params.id === id);
      // console.log(filtered);
      // const receipeData = response.data[(id =params.id)];
      // setMembers(response.data);
      console.log(response.data[0]);
      if (!response.data[0]) {
        return console.log("You're not connected");
      }
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // idArr.push(idInput);
    // idArr.push(pdInput);
    // console.log(idArr);
    // const usernameConnected = idArr[0];
    // // console.log(usernameConnected);
    // const loginConnected = idArr[1];
    // // console.log(loginConnected);
    // {
    //   //   idArr.map((favId) =>
    //   members.map((member) => (
    //     <React.Fragment key={member.id}>
    //       {console.log(member.login)}
    //       {console.log(loginConnected)}
    //       {usernameConnected === member.username &&
    //       loginConnected === member.login
    //         ? localStorage.setItem("id", member.id)
    //         : console.log("raté")}
    //       {/* {console.log(idmeal)} */}
    //     </React.Fragment>
    //   ));
    //   //   );
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="name">Identifiant:</label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={idInput}
              onChange={(event) => setIdInput(event.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="user_password"
              value={pdInput}
              onChange={(event) => setPdInput(event.target.value)}
            />
          </li>
          <div className="button">
            <button type="submit">Submit</button>
          </div>
          <div className="button">
            <button type="create">Create new account</button>
          </div>
        </ul>
      </form>
    </div>
  );
}

export default ConnexionPage;
