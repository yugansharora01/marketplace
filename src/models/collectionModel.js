import mongoose from "mongoose";

const collectionsSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: [true, "Please provide a Collection Name"],
  },
  author: {
    type: String,
    required: [true, "Please provide a Collection Owner"],
  },
  NFTs: {
    type: String,
    required: [true, "Collection cannot be empty"],
  },
});

const Collections =
  mongoose.models.collections ||
  mongoose.model("collections", collectionsSchema);

export default Collections;
