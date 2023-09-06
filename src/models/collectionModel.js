import mongoose from "mongoose";
import NFTsModel from "./NFTModel";

const collectionsSchema = new mongoose.Schema({
  CollectionName: {
    type: String,
    required: [true, "Please provide a Collection Name"],
  },
  Description: {
    type: String,
  },
  Chain: {
    type: String,
    required: [true, "Please provide a chain"],
  },
  TotalVolume: {
    type: Number,
  },
  NFTs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nfts",
    },
  ],
  CreatedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Collections =
  mongoose.models.collections ||
  mongoose.model("collections", collectionsSchema);

export default Collections;
