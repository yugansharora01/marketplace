import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: [true, "Please provide a Collection Name"],
  },
  Description: {
    type: String,
    default: "",
  },
  WalletAddress: {
    type: String,
    unique: true,
    required: [true, "Wallet address is required"],
  },
  ProfileImage: {
    type: String,
    default: "",
  },
  BannerImage: {
    type: String,
    default: "",
  },
  Socials: [
    {
      platform: {
        type: String,
        enum: ["Facebook", "Instagram", "Reddit", "Others"],
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
  Collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collections",
    },
  ],
  NFTs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nfts",
    },
  ],
  LikedCollections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collections",
    },
  ],
  LikedNFTs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nfts",
    },
  ],
  JoinedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;
