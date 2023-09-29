import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: [true, "Please provide a Collection Name"],
  },
  WalletAddress: {
    type: String,
    unique: true,
    required: [true, "Wallet address is required"],
  },
  ProfileImage: {
    type: String,
  },
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
