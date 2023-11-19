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

const PriceSchema = new mongoose.Schema({
  amount: {
    type: String,
    default: "0",
  },
  coinName: {
    type: String,
    default: "weth",
  },
  coinAddress: {
    type: String,
    default: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
});

const NFTSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  Creator: {
    type: String,
    required: true,
  },
  Price: {
    type: PriceSchema,
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
