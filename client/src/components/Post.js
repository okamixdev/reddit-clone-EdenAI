import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../helpers/auth";

function Post(props) {
  const headers = {
    Authorization: `${Auth.getToken()}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const handleUpvote = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          `/api/post/handleLike/`,
          { id: props.postID },
          { headers: headers }
        )
        .then((response) => {})
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const undoHandleUpvote = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          `/api/post/undoHandleLike/`,
          { id: props.postID },
          { headers: headers }
        )
        .then((response) => {})
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownvote = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="user-posts">
        <div className="post">
          <div className="upper-post">
            <img
              style={{ width: 40, height: 40, borderRadius: 30 }}
              alt="user-image"
              src={`${props.userProfile}`}
            ></img>
            <p>{props.username}</p>
            <p style={{ fontSize: 10 }}>#{props.comunity}</p>
          </div>
          <img alt="imag-post" src={`${props.image}`}></img>
          <div className="bottom-post">
            <p>{props.text}</p>
            <div>
              {!props.liked ? (
                <i onClick={handleUpvote} class="fa-solid fa-up-long">
                  {" "}
                  Upvote: {props.likes}
                </i>
              ) : (
                <i
                  onClick={undoHandleUpvote}
                  style={{ color: "white" }}
                  class="fa-solid fa-up-long"
                >
                  {" "}
                  Upvote: {props.likes}
                </i>
              )}
              <i class="fa-solid fa-comment"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
