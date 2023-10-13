import mongoose from "mongoose";
import NFTsModel from "./NFTModel";

const collectionsSchema = new mongoose.Schema({
  CollectionName: {
    type: String,
    required: [true, "Please provide a Collection Name"],
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide a owner"],
  },
  BannerImage: {
    type: String,
  },
  ProfileImage: {
    type: String,
  },
  Description: {
    type: String,
  },
  Category: {
    type: String,
  },
  Chain: {
    type: String,
    default: "Ethereum",
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
