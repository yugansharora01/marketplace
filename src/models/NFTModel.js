import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema({
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
});

const NFTSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Details: {
    type: DetailsSchema,
    required: true,
  },
  Stats: {
    type: Map,
    of: String,
    required: true,
  },
  Traits: {
    type: Map,
    of: String,
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
