import React, { useEffect, useState } from "react";
import Auth from "../helpers/auth";
import axios from "axios";
import Post from "../components/Post";

function Profile() {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);

  const checkLiked = (post) => {
    let found = post.likes.find((item) => item === Auth.getProfile().id);
    if (found !== undefined) return true;
  };

  const getPostData = async () => {
    await axios
      .get(`/api/post/userPost`, {
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

  return (
    <div>
      <div
        style={{
          fontSize: 30,
          color: "white",
          background: "#ff5858",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          width: "60%",
          margin: "0 auto",
          marginTop: 30,
          borderRadius: 10,
        }}
      >
        <img
          style={{ width: 60, height: 60, borderRadius: 50 }}
          alt="userimage"
          src={`${userData.img}`}
        ></img>
        <h4>{userData.username}</h4>
      </div>

      <div onClick={getPostData}>
        {postData.map((post) => (
          <Post
            text={post.text}
            comments={post.comments}
            image={post.file}
            likes={post.likes.length}
            username={post.user.username}
            userProfile={post.user.img}
            comunity={post.community._id}
            postID={post._id}
            liked={checkLiked(post)}
          />
        ))}
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
