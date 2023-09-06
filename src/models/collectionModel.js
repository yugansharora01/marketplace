import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  Details: {
    type: String,
    required: true,
  },
  Stats: {
    type: String,
    required: true,
  },
  Traits: {
    type: String,
    required: true,
  },
  Count: {
    type: Number,
    required: true,
  },
  Description: String,
  CreatedAt: {
    type: Date,
  },
});

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
  NFTs: {
    type: [NFTSchema],
    required: [true, "Collection cannot be empty"],
  },
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
