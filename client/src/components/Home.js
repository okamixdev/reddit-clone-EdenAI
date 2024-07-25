import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../helpers/auth";

function Home() {
  const [userData, setUserData] = useState([]);

  const headers = {
    Authorization: `${Auth.getToken()}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  const getUsers = async () => {
    try {
      await axios
        .get("/api/user/list/1", { headers: headers })
        .then((response) => {
          setUserData(response.data.users);
          console.log(response);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={getUsers}>GET USERS</button>
      {userData.map((user) => {
        return (
          <div
            style={{
              background: "white",
              color: "black",
              width: 400,
              margin: "0 auto",
              textAlign: "center",
              borderRadius: 30,
            }}
          >
            <h1>
              {user.first} {user.last}
            </h1>
            <h2>{user.email}</h2>
            <img alt="user-image" src={`${user.img}`}></img>
            <h1>{user.username}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
