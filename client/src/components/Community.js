import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Auth from "../helpers/auth";
import Post from "../components/Post";

function Community() {
  const [communityData, setCommunityData] = useState([]);
  const location = useLocation();

  const headers = {
    Authorization: `${Auth.getToken()}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  const getCommunities = async () => {
    try {
      await axios
        .get(`/api/community/getOne/${location.state.id}`, { headers: headers })
        .then((response) => {
          setCommunityData(response.data.communityInfo);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const checkLiked = (post) => {
    let found = post.likes.find((item) => item === Auth.getProfile().id);
    if (found !== undefined) return true;
  };

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <div style={{ width: 700, margin: "0 auto", marginTop: 30 }}>
      <div className="community-cont">
        <h1>{communityData[0]?.name}</h1>
        <h3>Followers: {communityData[0]?.followers.length}</h3>
        <h3>Posts: {communityData[0]?.posts.length}</h3>
      </div>
      <div onClick={getCommunities}>
        {communityData[0]?.posts?.map((post) => (
          <Post
            text={post.text}
            comments={post.comments}
            image={post.file}
            likes={post.likes.length}
            username={post.user.username}
            userProfile={post.user.img}
            comunity={communityData[0]?.name}
            postID={post._id}
            liked={checkLiked(post)}
          />
        ))}
      </div>
    </div>
  );
}

export default Community;
