import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
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

const NFTsModel = mongoose.models.nfts || mongoose.model("nfts", NFTSchema);

export default NFTsModel;
