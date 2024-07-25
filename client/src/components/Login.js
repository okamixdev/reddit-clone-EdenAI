import React, { useState, useEffect } from "react";
import axios from "axios";

export const Login = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
  });

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [userRegisterData, setUserRegisterData] = useState({
    email: "",
    password: "",
    first: "",
    last: "",
    username: "",
  });

  const handleInputLogChange = async (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleInputSignChange = async (e) => {
    const { name, value } = e.target;
    setUserRegisterData({ ...userRegisterData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/user/login", {
          email: userFormData.email,
          password: userFormData.password,
        })
        .then((response) => {
          localStorage.setItem("id_token", response.data.Token);
          console.log(response.data.user);
          setUserData({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            username: response.data.user.username,
          });
        })
        .catch((err) => console.log(err));

      window.location.assign("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUpSubmit = async (e) => {};

  return (
    <>
      <div className="log-container">
        <div className="container">
          <input type="checkbox" id="chek" aria-hidden="true"></input>

          <div className="signup-cont">
            <form className="signup-form" onSubmit={handleSignUpSubmit}>
              <label for="chek" aria-hidden="true">
                Sign Up
              </label>
              <input
                type="text"
                required="true"
                placeholder="First Name"
                name="first"
                value={userRegisterData.first}
                onChange={handleInputSignChange}
              />
              <input
                type="text"
                required="true"
                placeholder="Last Name"
                name="last"
                value={userRegisterData.last}
                onChange={handleInputSignChange}
              />
              <input
                type="text"
                required="true"
                placeholder="Username"
                name="username"
                value={userRegisterData.username}
                onChange={handleInputSignChange}
              />
              <input
                type="text"
                required="true"
                placeholder="Email"
                name="email"
                value={userRegisterData.email}
                onChange={handleInputSignChange}
              />
              <input
                type="password"
                required="true"
                placeholder="Password"
                name="password"
                value={userRegisterData.password}
                onChange={handleInputSignChange}
              />
              <button type="submit" placeholder="login">
                Sign Up
              </button>
            </form>
          </div>

          <div className="login-cont">
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label for="chek" aria-hidden="true">
                Login
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={userFormData.email}
                onChange={handleInputLogChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userFormData.password}
                onChange={handleInputLogChange}
              />
              <button type="submit" placeholder="login">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
