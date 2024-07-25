import React, { useEffect, useState } from "react";
import Auth from "../helpers/auth";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);

  const getPostData = async () => {
    await axios
      .get(`/api/post/userPost/${userData.id}`, {
        headers: { Authorization: `${Auth.getToken()}` },
      })
      .then((response) => {
        setPostData(response.data.userPostInfo);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUserData(Auth.getProfile());
    getPostData();
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="user-info-cont">
        <div className="user-info">
          <img alt="user-image" src={`${userData.img}`}></img>
          <h1>{userData.username}</h1>
        </div>
        <div className="user-stats">
          <h3>Upvotes : 3</h3>
        </div>
      </div>
      <div className="user-posts">
        {postData?.map((post) => {
          console.log(post);
          return (
            <div className="post">
              <div className="upper-post">
                <img
                  style={{ width: 40, height: 40, borderRadius: 30 }}
                  alt="user-image"
                  src={`${post.user.img}`}
                ></img>
                <p>{post.user.username}</p>
              </div>
              <img alt="imag-post" src={`${post.file}`}></img>
              <div className="bottom-post">
                <p>{post.text} | #group23 |</p>
                <div className="post-icons">
                  <h4>2</h4>
                  <i class="fa-solid fa-up-long"> Upvote</i>
                  <i class="fa-solid fa-comment"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          Auth.logout();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Profile;
