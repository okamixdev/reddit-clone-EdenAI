import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../helpers/auth";

function Create() {
  const [file, setFile] = useState({});
  const [caption, setCaption] = useState("");
  const [postData, setPostData] = useState([]);

  const headers = {
    Authorization: `${Auth.getToken()}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const headers2 = {
    Authorization: `${Auth.getToken()}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(caption);

    try {
      await axios
        .post("/api/post/savePost", { text: caption }, { headers: headers })
        .then((response) => {
          setPostData(response.data.postData);

          try {
            const formData = new FormData();
            formData.append("file", file);

            axios
              .post(
                `/api/post/upload/${response.data.postData._id}`,
                formData,
                {
                  headers: headers2,
                }
              )
              .then((response) => {
                console.log(response);
              })
              .catch((error) => console.log(error));
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>CREATE</h1>
      <div className="form-cont">
        <form>
          <input
            className="text-in-create"
            type="text"
            placeholder="Caption"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          ></input>
          <input
            className="files"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></input>
          <button onClick={handleSubmit}>Submit!</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
