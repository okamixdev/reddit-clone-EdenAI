import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../helpers/auth";
import { NavLink } from "react-router-dom";

function Home() {
  const [communityData, setCommunityData] = useState([]);

  const headers = {
    Authorization: `${Auth.getToken()}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  const getCommunities = async () => {
    try {
      await axios
        .get("/api/community/getAll", { headers: headers })
        .then((response) => {
          setCommunityData(response.data.communityInfo);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);

  const checkCommunities = (community) => {
    let found = community.followers.find(
      (item) => item === Auth.getProfile().id
    );
    if (found !== undefined) return true;
  };

  const handleAdd = async (com_id) => {
    try {
      await axios
        .post(
          `/api/community/follow`,
          { id: com_id, user: Auth.getProfile().id },
          { headers: { Authorization: `${Auth.getToken()}` } }
        )
        .then((response) => {})
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (com_id) => {
    try {
      await axios
        .post(
          `/api/community/unfollow`,
          { id: com_id, user: Auth.getProfile().id },
          { headers: { Authorization: `${Auth.getToken()}` } }
        )
        .then((response) => {})
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: 30 }}>EXPLORE NEW COMMUNITIES</h1>
      {communityData.map((community) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 50,
            }}
          >
            <NavLink
              style={{ textDecoration: "none" }}
              to="/community"
              state={{ id: `${community._id}` }}
            >
              <div className="community-cont">
                <h1>{community.name} </h1>
              </div>
            </NavLink>
            <div className="add-unad">
              {checkCommunities(community) ? (
                <i
                  onClick={() => {
                    handleRemove(community._id);
                    getCommunities();
                  }}
                  class="fa-solid fa-check"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    handleAdd(community._id);
                    getCommunities();
                  }}
                  class="fa-solid fa-plus"
                ></i>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
