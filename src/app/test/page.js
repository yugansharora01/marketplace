"use client";
import React, { useEffect, useState } from "react";
import Style from "../../styles/test.module.css";
import axios from "axios";

const test = () => {
  const [NFT, setNFT] = useState({
    Details: "",
    Stats: "",
    Traits: "",
    Count: 1,
    Description: "",
  });

  const [collection, setCollection] = useState({
    CollectionName: "",
    Description: "",
    Chain: "",
    TotalVolume: 0,
    CreatedAt: Date.now(),
    NFTs: [],
  });

  const [loading, setLoading] = useState(false);
  const OnSubmit = async () => {
    try {
      setLoading(true);
      collection.NFTs.push(NFT);
      console.log(collection);
      const response = await axios.post("/api/Collections", collection);
      console.log("Success submission " + response.data);
      collection.NFTs = [];
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
          value={collection.CollectionName}
          onChange={(e) =>
            setCollection({ ...collection, CollectionName: e.target.value })
          }
          placeholder="Collection Name"
        />
      </div>
      <div className={Style.test_input}>
        <label>Description</label>
        <input
          id="Description"
          type="text"
          value={collection.Description}
          onChange={(e) =>
            setCollection({ ...collection, Description: e.target.value })
          }
          placeholder="Description"
        />
      </div>
      <div className={Style.test_input}>
        <label>Chain</label>
        <input
          id="Chain"
          type="text"
          value={collection.Chain}
          onChange={(e) =>
            setCollection({ ...collection, Chain: e.target.value })
          }
          placeholder="Chain"
        />
      </div>
      <div className={Style.test_input}>
        <label>Total Volume</label>
        <input
          id="TotalVolume"
          type="text"
          value={collection.TotalVolume}
          onChange={(e) =>
            setCollection({ ...collection, TotalVolume: e.target.value })
          }
          placeholder="TotalVolume"
        />
      </div>
      <div className={Style.test_input}>
        <label>CreatedAt</label>
        <input
          id="TotalVolume"
          type="date"
          value={collection.CreatedAt}
          onChange={(e) =>
            setCollection({ ...collection, CreatedAt: e.target.value })
          }
          placeholder="TotalVolume"
        />
      </div>
      <div className={Style.test_div}>
        <h1>NFTs</h1>
        <div className={Style.test_input}>
          <label>Details</label>
          <input
            id="NFTDetails"
            type="text"
            value={NFT.Details}
            onChange={(e) => setNFT({ ...NFT, Details: e.target.value })}
            placeholder="NFT Details"
          />
        </div>
        <div className={Style.test_input}>
          <label>Stats</label>
          <input
            id="NFTStats"
            type="text"
            value={NFT.Stats}
            onChange={(e) => setNFT({ ...NFT, Stats: e.target.value })}
            placeholder="NFT Stats"
          />
        </div>
        <div className={Style.test_input}>
          <label>Traits</label>
          <input
            id="NFTTraits"
            type="text"
            value={NFT.Traits}
            onChange={(e) => setNFT({ ...NFT, Traits: e.target.value })}
            placeholder="NFT Traits"
          />
        </div>
        <div className={Style.test_input}>
          <label>Count</label>
          <input
            id="NFTCount"
            type="text"
            value={NFT.Count}
            onChange={(e) => setNFT({ ...NFT, Count: e.target.value })}
            placeholder="NFT Count"
          />
        </div>
        <div className={Style.test_input}>
          <label>Description</label>
          <input
            id="NFT Description"
            type="text"
            value={NFT.Description}
            onChange={(e) => setNFT({ ...NFT, Description: e.target.value })}
            placeholder="NFT Description"
          />
        </div>
      </div>
      <div className={Style.test_button}>
        <button onClick={OnSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default test;
