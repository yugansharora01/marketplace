import mongoose from "mongoose";

const MapSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const NFTSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  Creator: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
  },
  MediaLink: {
    type: String,
    required: true,
  },
  ContractAddress: {
    type: String,
    required: true,
  },
  TokenID: {
    type: String,
    required: true,
  },
  TokenStandard: {
    type: String,
    default: "ERC-20",
  },
  Chain: {
    type: String,
    required: true,
  },
  Metadata: {
    type: String,
    required: true,
  },
  LastUpdated: {
    type: Date,
    required: true,
  },
  Stats: {
    type: [MapSchema],
  },
  Traits: {
    type: [MapSchema],
  },
  Count: {
    type: Number,
    required: true,
  },
  Description: String,
  CreatedAt: {
    type: Date,
  },
  CollectionID: {
    type: String,
    required: true,
  },
});

const NFTsModel = mongoose.models.nfts || mongoose.model("nfts", NFTSchema);

export default NFTsModel;
