"use client";
import React, { useState } from "react";
import Style from "../../styles/test.module.css";
import axios from "axios";

const test = () => {
  const [collection, setCollection] = useState({
    collectionName: "",
    author: "",
    NFTs: "",
  });

  const [loading, setLoading] = useState(false);
  const OnSubmit = async () => {
    try {
      setLoading(true);
      console.log(collection);
      const response = await axios.post("/api/Collections", collection);
      console.log("Success submission " + response.data);
    } catch (error) {
      console.log("Collection submit failed " + error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.test}>
      <h1>{loading ? "Processing" : "Submit"}</h1>
      <div className={Style.test_input}>
        <label>Collection name</label>
        <input
          id="CollectionName"
          type="text"
          value={collection.collectionName}
          onChange={(e) =>
            setCollection({ ...collection, collectionName: e.target.value })
          }
          placeholder="Collection Name"
        />
      </div>
      <div className={Style.test_input}>
        <label>Author</label>
        <input
          id="Author"
          type="text"
          value={collection.author}
          onChange={(e) =>
            setCollection({ ...collection, author: e.target.value })
          }
          placeholder="Author"
        />
      </div>
      <div className={Style.test_input}>
        <label>NFTs</label>
        <input
          id="NFTs"
          type="text"
          onChange={(e) =>
            setCollection({ ...collection, NFTs: e.target.value })
          }
          placeholder="NFT"
        />
      </div>
      <div className={Style.test_button}>
        <button onClick={OnSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default test;
