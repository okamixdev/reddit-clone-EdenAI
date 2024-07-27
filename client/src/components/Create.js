import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../helpers/auth";

function Create() {
  const [file, setFile] = useState({});
  const [caption, setCaption] = useState("");
  const [comunity, setComunity] = useState("");
  const [postData, setPostData] = useState([]);
  const [communityData, setCommunityData] = useState([]);

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
        .post(
          "/api/post/savePost",
          { text: caption, comunity: comunity },
          { headers: headers }
        )
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

  const getCommunities = async () => {
    try {
      await axios
        .get("/api/community/getAll", { headers: headers })
        .then((response) => {
          setCommunityData(response.data.communityInfo);
          console.log(response);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>CREATE</h1>
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
          <div>
            <h1>Select a Comunity</h1>
            <h4>(Copy and paste the comunity id)</h4>
            {communityData.map((item) => (
              <div style={{ background: "black", borderRadius: 20 }}>
                <h4>{item.name}</h4>
                <h4>{item._id}</h4>
              </div>
            ))}
          </div>
          <input
            className="text-in-create"
            type="text"
            placeholder="copy id here"
            onChange={(e) => {
              setComunity(e.target.value);
            }}
          ></input>
          <button onClick={handleSubmit}>Submit!</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
